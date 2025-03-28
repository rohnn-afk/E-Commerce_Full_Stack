import BestSeller from "../Components/BestSeller"
import Hero from "../Components/Hero"
import LatestCollection from "../Components/LatestCollection"
import NewsLetter from "../Components/NewsLetter"
import OurPolicy from "../Components/OurPolicy"

const Home = () => {
  return (
    <div>
        <Hero/>
        <LatestCollection/>
        <BestSeller/>
        <OurPolicy/>
        <NewsLetter/>
      
    </div>
  )
}

export default Home
