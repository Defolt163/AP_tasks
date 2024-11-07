'use client'
import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import T3_1 from "./components/3-1";
  

export default function LabaPage(){
    
    return(
        <div className="dark">
            <div className="center">
                <h1>Laba 3</h1>
                <Accordion type="multiple" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Task 3.1</AccordionTrigger>
                        <AccordionContent>
                            <T3_1/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Task 3.2</AccordionTrigger>
                        <AccordionContent>

                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Task 3.3</AccordionTrigger>
                        <AccordionContent>

                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Task 3.4</AccordionTrigger>
                        <AccordionContent>

                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Task 3.5</AccordionTrigger>
                        <AccordionContent>

                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger>Task 3.6</AccordionTrigger>
                        <AccordionContent>

                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-7">
                        <AccordionTrigger>Task 2.7</AccordionTrigger>
                        <AccordionContent>

                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}