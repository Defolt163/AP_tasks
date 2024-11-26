'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import T4_1 from "./components/4.1/T4_1"
import T4_4 from "./components/4.4/T4_4"
import T4_5 from "./components/4.5/T4_5"
import T4_6 from "./components/4.6/T4_6"

export default function LabaPage(){

    return(
        <div className="dark">
            <div className="center">
                <h1>Laba 4</h1>
                <Accordion type="multiple" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Task 4.1</AccordionTrigger>
                        <AccordionContent>
                            <T4_1/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Task 4.4</AccordionTrigger>
                        <AccordionContent>
                            <T4_4/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Task 4.5</AccordionTrigger>
                        <AccordionContent>
                            <T4_5/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Task 4.6</AccordionTrigger>
                        <AccordionContent>
                            <T4_6/>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}