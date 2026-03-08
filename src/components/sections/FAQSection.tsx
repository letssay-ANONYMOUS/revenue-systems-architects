import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionWrapper from "./SectionWrapper";
import SectionHeading from "./SectionHeading";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  items: FAQItem[];
}

const FAQSection = ({ items }: FAQSectionProps) => (
  <SectionWrapper id="faq">
    <SectionHeading
      overline="FAQ"
      title="Common Questions,"
      titleAccent="Clear Answers"
      align="center"
    />
    <div className="max-w-2xl mx-auto">
      <Accordion type="single" collapsible className="space-y-2">
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border border-border rounded-xl px-5 md:px-6 bg-card data-[state=open]:border-primary/20 transition-colors"
          >
            <AccordionTrigger className="text-sm md:text-base font-display font-medium py-4 md:py-5 hover:no-underline text-left">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pb-4 md:pb-5 leading-relaxed">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </SectionWrapper>
);

export default FAQSection;
