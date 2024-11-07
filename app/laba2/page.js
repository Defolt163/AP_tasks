'use client'
import { useEffect, useState } from "react";
import T2_1 from "./components/2.1/2-1";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import T2_2 from "./components/2.2/2-2";
import T2_4 from "./components/2.3/2-4";
import T2_5 from "./components/2.5/2_5";
import T2_6 from "./components/2.6/2_6";
  

export default function LabaPage(){
    function countIteration(){
        for(let i=1; i<= 10; i++){
            console.log(i)
        }
    }

    const [number, setNumber] = useState("")
    
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
                            <div className="Button" onClick={()=>{countIteration()}}>Старт</div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Task 2.4</AccordionTrigger>
                        <AccordionContent>
                            <T2_4/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Task 2.5</AccordionTrigger>
                        <AccordionContent>
                            <div>
                                <input value={number} onChange={(e)=>{setNumber(e.target.value)}}/>
                                <h2>Длина строки: {number.length}</h2>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger>Task 2.6</AccordionTrigger>
                        <AccordionContent>
                            <T2_5/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-7">
                        <AccordionTrigger>Task 2.7</AccordionTrigger>
                        <AccordionContent>
                            <T2_6/>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}