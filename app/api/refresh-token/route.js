export async function POST(req) {
    const { refreshToken } = await req.json();

    if (!refreshToken) {
        return new Response(JSON.stringify({ message: 'No refresh token provided' }), { status: 401 });
    }

    try {
        // Проверяем рефреш-токен
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
        const userId = decoded.id;

        // Проверяем, соответствует ли рефреш-токен в базе данных
        const [rows] = await accountDB.query('SELECT * FROM users WHERE id = ? AND refresh_token = ?', [userId, refreshToken]);
        if (rows.length === 0) {
            throw new Error('Invalid refresh token');
        }

        const user = rows[0];

        // Генерируем новый Access-токен
        const newAccessToken = jwt.sign(
            { id: user.id, name: user.Name, login: user.login, role: user.role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        return new Response(JSON.stringify({ accessToken: newAccessToken }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ message: 'Invalid or expired refresh token' }), { status: 401 });
    }
}
