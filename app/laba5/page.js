'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Person } from "./components/1/T1"
import { Circle } from "./components/3/T3"
import { ShapeInfo, CircleT4, RectangleT4 } from "./components/4/T4"
import { CircleT5, RectangleT5, printAreas } from "./components/5/T5"
import { Book, BookInfo } from "./components/6/T6"

export default function LabaPage(){

    //4
    const circle = new CircleT4(5); // Круг с радиусом 5
    const rectangle = new RectangleT4(4, 6);

    //5
    const shapes = [
        new CircleT5(5),
        new RectangleT5(4, 6),
        { someProp: 10 }, // Некорректный объект
    ]

    //6
    const book1 = new Book("Книга номер 1", "Известный автор", 1949);
    const book2 = new Book("Книга номер 2", "Неизвестный автор", 1960);

    return(
        <div className="dark">
            <div className="center">
                <h1>Laba 5</h1>
                <Accordion type="multiple" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Task 5.1</AccordionTrigger>
                        <AccordionContent>
                            <Person initialName="Person 1" initialAge={23}/>
                            <Person initialName="Person 2" initialAge={22}/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Task 5.3</AccordionTrigger>
                        <AccordionContent>
                            <Circle radius={5}/>
                            <Circle radius={15}/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Task 5.4</AccordionTrigger>
                        <AccordionContent>
                            <ShapeInfo shape={circle} />
                            <ShapeInfo shape={rectangle} />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Task 5.5</AccordionTrigger>
                        <AccordionContent>
                            {printAreas(shapes)}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Task 5.6</AccordionTrigger>
                        <AccordionContent>
                            <BookInfo book={book1} />
                            <BookInfo book={book2} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}