'use client';

import React from "react"
import PlainCssSlider from "@/components/Templates/kitchenSink/PlainCssSlider"
import AccordionUsage from "@/components/Templates/kitchenSink/AccordionUsage"
import AccordionUsageB from "@/components/Templates/kitchenSink/AccordionUsageB"
import BasicButtons from "@/components/Templates/kitchenSink/BasicButtons"
import TextButtons from "@/components/Templates/kitchenSink/TextButtons"
import ControlledAccordion from "@/components/Globals/ControlledAccordion"

export default function KitchenSink() {
  return (
    <>
      <PlainCssSlider />
      <AccordionUsage />
      <AccordionUsageB />
      <BasicButtons />
      <TextButtons />
      <ControlledAccordion children={[<p>hmmm</p>, <p title={"Status"} >works</p>]} />
    </>
  )
}
