import { Button } from "@/components/ui/button"
import Link from "next/link";


export default function Home() {
  return (
    <div className="main-page dark full-size">
      <div className="container">
        <div className="center">
          <Link className="Button mb-15" href={'/laba1'}>Laba 1</Link>
          <Link className="Button mb-15" href={'/laba2'}>Laba 2</Link>
          <Link className="Button mb-15" href={'/1'}>Laba 3</Link>
          <Link className="Button mb-15" href={'/1'}>Laba 4</Link>
          <Link className="Button mb-15" href={'/1'}>Laba 5</Link>
          <Link className="Button mb-15" href={'/1'}>Laba 6</Link>
          <Link className="Button mb-15" href={'/1'}>Laba 7</Link>
          <Link className="Button mb-15" href={'/1'}>Laba 8</Link>
          <Link className="Button mb-15" href={'/1'}>Laba 9</Link>
          <Link className="Button mb-15" href={'/1'}>Laba 10</Link>
        </div>
      </div>
    </div>
  );
}
