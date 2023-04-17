import React from 'react'
import Navbar from './Navbar'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Fade ,Zoom,rubberBand,Slide} from "react-awesome-reveal";
import BottomNavigation from './BottomNavigation';
import { useNavigate } from 'react-router-dom';
import 'animate.css';
function Landing_page() {
  let navigate=useNavigate()
  return <>
  <Navbar/>
  <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" >
  <div className="carousel-inner">
    <div className="carousel-item active" >
      <img className="d-block " src="istockphoto-956944426-1024x1024-transformed.jpeg" alt="First slide"/>
    </div>
    <div className="carousel-item" >
      <img className="d-block" src="istockphoto-944687452-1024x1024-transformed.jpeg" alt="Second slide"/>
    </div>
    <div className="carousel-item" >
      <img className="d-block" src="istockphoto-1297005217-1024x1024-transformed.jpeg" alt="Third slide"/>
    </div>
    <div className="carousel-item" >
      <img className="d-block" src="istockphoto-1297055495-1024x1024-transformed.jpeg" alt="Fourth slide"/>
    </div>
    <div className="carousel-item" >
      <img className="d-block" src="istockphoto-1354068696-1024x1024-transformed.jpeg" alt="Fifth slide"/>
    </div>
    <div className="carousel-item" >
      <img className="d-block" src="istockphoto-1203667122-1024x1024-transformed.jpeg" alt="sixth slide"/>
    </div>
  </div>
</div>
<div className='Carousel-content-container'>

  <Zoom>
<div className='Carousel-content'>
      <h2>
      Order fresh dairy Products
      </h2>
      <p className='mt-3'>
        Enjoy the convenience of doorstep delivery for a wide range of locally-sourced milk. Get farm fresh dairy products delivered to your doorstep everyday in morning. Cow milk at 46/litre. Delivery before 6:30 am.
      </p>

    </div>
    </Zoom>
    </div>
    <div className='App-container m-5'>
        <div id="about-us">
        <h2 style={{textAlign:"center"}}>About us</h2>
        <div className='About-us-content mt-5'>
            <div className='About-us-text'>Welcome to Milky Way, the ultimate destination for dairy lovers!

At Milky Way, we understand the importance of high-quality dairy products that are both delicious and nutritious. That's why we are committed to bringing you the freshest and finest dairy products available in the market.

Our range of dairy products includes a wide variety of milk, cheese, butter, cream, and yogurt. Each product is carefully crafted using only the highest quality ingredients, ensuring that you get the best taste and nutrition in every bite.

Our milk is sourced from local farms that follow ethical and sustainable farming practices. We take pride in offering you fresh, pure, and unadulterated milk that is free from any artificial additives or preservatives.

Our cheese selection is also diverse, ranging from mild cheddar to sharp parmesan, and everything in between. Our cheese is aged to perfection, giving it a rich, tangy flavor that is perfect for any dish.

Butter is another one of our specialties. Made from pure cream, our butter is rich and creamy, making it the perfect addition to any meal. And if you're looking for something to add to your coffee, our cream is the perfect choice. Made from fresh, wholesome milk, our cream is smooth, silky, and delicious.

Finally, we offer a range of yogurt that is not only delicious but also packed with probiotics and essential nutrients. Whether you prefer Greek yogurt, flavored yogurt, or plain yogurt, we have something for everyone.

At Milky Way, we believe that dairy products should not only taste great but also be good for you. That's why we are committed to providing you with the freshest, purest, and most nutritious dairy products available. So go ahead, indulge in our dairy products and experience the Milky Way difference!</div>
            <img src="istockphoto-1312913947-1024x1024-transformed-removebg-preview.png"></img>
            </div>

            <div className='video-preview mt-3'>

                  <video  muted={true} playsinline="" autoplay="" loop={true}>
                  <source src='video-preview - Made with Clipchamp (1) (1) (1) (1).mp4'/>
                  </video>
                </div>
              
             <div className='categories mt-5 mb-5'>
              <h4>Shop by categories</h4>
              <div className='ct row row-cols-1 row-cols-xl-4 row-cols-md-3 row-cols-sm-2 g-5 m-1 mt-3'>
                <Zoom>
               <div className='category-card' onClick={()=>navigate('/Products/Milk')}>
               <img src='fresh-milk-mug-jug-wooden-table.jpg'></img>
               <p style={{fontSize:"14px",textAlign:"center"}}>Milk</p>
               </div>
               </Zoom>
               <Zoom>
               <div className='category-card' onClick={()=>navigate('/Products/Egg')}>
               <img src='Eggs.png'></img>
               <p style={{fontSize:"14px",textAlign:"center"}}>Eggs</p>
               </div>
               </Zoom>
               <Zoom>
               <div className='category-card' onClick={()=>navigate('/Products/Curd')}>
               <img src='imageedit_2_9845413963.jpg'></img>
               <p style={{fontSize:"14px",textAlign:"center"}}>Curd</p>
               </div>
               </Zoom>
               <Zoom>
               <div className='category-card'onClick={()=>navigate('/Products/Ghee')}>
               <img src='istockphoto-1187181045-1024x1024-transformed.jpeg'></img>
               <p style={{fontSize:"14px",textAlign:"center"}}>Ghee</p>
               </div>
               </Zoom>
               <Zoom>
               <div className='category-card'onClick={()=>navigate('/Products/Yogurt')}>
               <img src='istockphoto-515777808-1024x1024-transformed.jpeg'></img>
               <p style={{fontSize:"14px",textAlign:"center"}}>Yogurt</p>
               </div>
               </Zoom>
               <Zoom>
               <div className='category-card'onClick={()=>navigate('/Products/Panneer')}>
               <img src='istockphoto-1210307314-1024x1024-transformed.jpeg'></img>
               <p style={{fontSize:"14px",textAlign:"center"}}>Panneer</p>
               </div>
               </Zoom>
               <Zoom>
               <div className='category-card'onClick={()=>navigate('/Products/Butter')}>
               <img src='istockphoto-179875636-1024x1024-transformed.jpeg'></img>
               <p style={{fontSize:"14px",textAlign:"center"}}>Butter</p>
               </div>
               </Zoom>
               <Zoom>
               <div className='category-card'onClick={()=>navigate('/Products/Honey')}>
               <img src='istockphoto-520733611-1024x1024-transformed.jpeg'></img>
               <p style={{fontSize:"14px",textAlign:"center"}}>Honey</p>
               </div>
               </Zoom>
              </div>
              </div>
        </div>
        <h2 className='mt-5'>Why us ?</h2>
      <div className='Why-us'>
     <div className='why-us-content'>
    <Slide><img className="why-us-img" src="pngwing.com.png">
          </img></Slide>
          <p> We provide free and fast delivery.
            you will receive your order within <i class="fa-solid fa-bolt"></i> 90mins
          </p>
         </div>
       <div className='why-us-content'>
       <Zoom> <img className="why-us-img" src="26210-removebg-preview.png">
          </img></Zoom>
          <p> We provide fresh products direct from farm with no preservatives added.
          </p>
         </div>
       <div className='why-us-content'>
          <Zoom><img className="why-us-img" src="pngwing.com (1).png">
          </img></Zoom>
          <p> We provide best and Quality Customer Support
            you can reach to us anytime
          </p>
         </div>
      </div>
    </div>
    <BottomNavigation/>
  </>
}

export default Landing_page