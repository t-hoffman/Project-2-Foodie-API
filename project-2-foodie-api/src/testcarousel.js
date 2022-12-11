import Carousel from 'react-bootstrap/Carousel';
import Test from './test_yelp';

function TestCarousel() {
  return (
    <Carousel interval={null}>
      <Carousel.Item>
      <img src="http://cdn.cnn.com/cnnnext/dam/assets/221128091918-02-kim-kardashian-balenciaga-super-tease.jpg" width="100%" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="http://cdn.cnn.com/cnnnext/dam/assets/221128091918-02-kim-kardashian-balenciaga-super-tease.jpg" width="100%" />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="http://cdn.cnn.com/cnnnext/dam/assets/221128091918-02-kim-kardashian-balenciaga-super-tease.jpg" width="100%" />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default TestCarousel;

// function Carousel () {
//     return (<>
//         <div class="main-carousel">
//             <div class="gallery-cell"><img src="http://cdn.cnn.com/cnnnext/dam/assets/221128091918-02-kim-kardashian-balenciaga-super-tease.jpg" width="600px" /></div>
//             <div class="gallery-cell"><img src="http://cdn.cnn.com/cnnnext/dam/assets/221128091918-02-kim-kardashian-balenciaga-super-tease.jpg" width="600px" /></div>
//             <div class="gallery-cell"><img src="http://cdn.cnn.com/cnnnext/dam/assets/221128091918-02-kim-kardashian-balenciaga-super-tease.jpg" width="600px" /></div>
//             <div class="gallery-cell"><img src="http://cdn.cnn.com/cnnnext/dam/assets/221128091918-02-kim-kardashian-balenciaga-super-tease.jpg" width="600px" /></div>
//             <div class="gallery-cell"><img src="http://cdn.cnn.com/cnnnext/dam/assets/221128091918-02-kim-kardashian-balenciaga-super-tease.jpg" width="600px" /></div>
//         </div>
//     </>)
// }

// export default Carousel;