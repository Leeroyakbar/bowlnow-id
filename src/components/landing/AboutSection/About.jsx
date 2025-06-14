import ChooseUsSection from "./ChooseUsSection"
import WhyUsSection from "./WhyUsSection"

export default function About() {
  return (
    <div className="min-h-fit bg-gray-50">
      <WhyUsSection />
      <ChooseUsSection />
    </div>
  )
}
