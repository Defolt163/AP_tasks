'use client'
import { useEffect, useRef, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import './style.sass'
import { T1 } from './components/1/T1'
import { T2 } from './components/2/T2'
import { T3 } from './components/3/T3'
import { T4 } from './components/4/T4'
import { T5 } from './components/5/T5'
import { T6 } from './components/6/T6'

export default function LabaPage(){
    

    return(
        <div className="dark">
            <div className="center">
                <h1>Laba 7</h1>
                <Accordion type="multiple" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Task 6.1</AccordionTrigger>
                        <AccordionContent>
                            <T1/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Task 6.2</AccordionTrigger>
                        <AccordionContent>
                            <T2/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Task 6.3</AccordionTrigger>
                        <AccordionContent>
                            <T3/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Task 6.4</AccordionTrigger>
                        <AccordionContent>
                            <T4/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Task 6.5</AccordionTrigger>
                        <AccordionContent>
                            <T5/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger>Task 6.6</AccordionTrigger>
                        <AccordionContent>
                            <T6/>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}