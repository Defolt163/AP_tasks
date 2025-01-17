'use client'
import T2_1 from "./components/2.1/2-1";
import T2_2 from "./components/2.2/2-2";
import T2_4 from "./components/2.3/2-4";
import T2_5 from "./components/2.5/2_5";
import T2_6 from "./components/2.6/2_6";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function LabaPage(){

    return(
        <div className="dark">
            <div className="center">
                <h1>Laba 2</h1>
                <Accordion type="multiple" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Task 2.1</AccordionTrigger>
                        <AccordionContent>
                            <T2_1/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Task 2.2</AccordionTrigger>
                        <AccordionContent>
                            <T2_2/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Task 2.3</AccordionTrigger>
                        <AccordionContent>
                            <T2_4/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Task 2.4</AccordionTrigger>
                        <AccordionContent>
                            <T2_5/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Task 2.5</AccordionTrigger>
                        <AccordionContent>
                            <T2_6/>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}