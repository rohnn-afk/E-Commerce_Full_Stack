import { assets } from "../../public/frontend_assets/assets"
import Titles from "../Components/Titles"

const Contact = () => {
  return (
    <div>
      
      <div className="text-center text-2xl pt-10 border-t">
        <Titles text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={assets.contact_img}/>
        <div className="flex flex-col justify-center items-start gap-6">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  )
}

export default Contact
