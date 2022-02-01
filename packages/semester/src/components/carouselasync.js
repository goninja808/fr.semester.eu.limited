import React, { useRef, useLayoutEffect, useState } from "react";
import { connect, styled } from "frontity";
import ReactPlayer from "react-player/lazy";
import Carousel from 'react-bootstrap/Carousel'
 
// const ComponentWithDimensions = props => {
//     const targetRef = useRef();
//     const [dimensions, setDimensions] = useState({ width: 0, heigth: 0 });
  
//     // holds the timer for setTimeout and clearInterval
//     let movement_timer = null;
  
//     // the number of ms the  size must stay the same size before the
//     // dimension state variable is reset
//     const RESET_TIMEOUT = 100;
  
//     const test_dimensions = () => {
//       // For some reason targetRef.current.getBoundingClientRect was not available
//       // I found this worked for me, but unfortunately I can't find the
//       // documentation to explain this experience
//       if (targetRef.current) {
//         setDimensions({
//           width: targetRef.current.offsetWidth,
//           height: targetRef.current.offsetHeight
//         });
//       }
//     };
  
//     // This sets the dimensions on the first render
//     useLayoutEffect(() => {
//       test_dimensions();
//     }, []);
  
//     // every time the  is resized, the timer is cleared and set again
//     // the net effect is the component will only reset after the  size
//     // is at rest for the duration set in RESET_TIMEOUT.  This prevents rapid
//     // redrawing of the component for more complex components such as charts
//     .addEventListener("resize", () => {
//       clearInterval(movement_timer);
//       movement_timer = setTimeout(test_dimensions, RESET_TIMEOUT);
//     });
  
//     return (
//       <div ref={targetRef} maxHeight= {dimensions.width} maxHeight= {dimensions.height} > </div>
//     );
//   };
  
  
 

const CarouselAsynch = ({state, initMedia, preMedia, postMedia }) => {
    const maxheight = 220; 
    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({ width:0, height: 0 });
    
    useLayoutEffect(() => {
        if (targetRef.current) {
          setDimensions({
            width: targetRef.current.offsetWidth,
            height: targetRef.current.offsetHeight
          });
        }
      }, []);
    var maxwidth = 320;//dimensions.width;
    
    return (
        <>
        {/* <ComponentWithDimensions /> */}
            <SliderWrapper className="flex-container">
                <div classe='wrappedContent' style={{ maxHeight: maxheight + 'px' }}>
                {( preMedia || postMedia || (initMedia && initMedia !=0)) ? 
                    <Carousel interval={5500} variant="dark"  >
                         <Carousel.Item> <img src="https://fr-semester.blog/wp-content/uploads/2022/01/intro-low1.gif" style={{ maxWidth: maxwidth + 'px' }} /></Carousel.Item>
                        {initMedia && initMedia != 0 ?
                            <Carousel.Item>
                                <img src={state.source.attachment[initMedia].source_url} style={{ maxWidth: maxwidth + 'px' }} />
                            </Carousel.Item> : null}
                       
                        {preMedia && !(preMedia.includes("videoapi-muybridge.vimeocdn.com")) ?
                            <Carousel.Item>
                                <ReactPlayer url={preMedia + "?quality=240p"} playing={false} autoPlay={false} mute={true} loop={false} controls={true} width={maxwidth} height={maxheight} lazy={true}
                                    config={{
                                        vimeo: {
                                            playerOptions: { quality: '240p', }
                                        },
                                        file: {
                                            attributes: { controlsList: "nofullscreen", },
                                        },
                                    }}
                                />  </Carousel.Item> : null}
                        {preMedia && (preMedia.includes("videoapi-muybridge.vimeocdn.com")) ?
                            <Carousel.Item>
                                <img src={preMedia}  style={{ maxWidth: maxwidth + 'px' }} />
                            </Carousel.Item> : null}
                        {postMedia && !(postMedia.includes("videoapi-muybridge.vimeocdn.com")) ? <Carousel.Item>
                            <ReactPlayer url={postMedia + "?quality=240p"} playing={false} autoPlay={false} mute={true}  loop={false} controls={true} width={maxwidth} height={maxheight} lazy={true}
                                config={{
                                    vimeo: {
                                        playerOptions: { quality: '240p', }
                                    },
                                    file: {
                                        attributes: { controlsList: "nofullscreen", },
                                    },
                                }}
                            /></Carousel.Item> : null}
                        {postMedia && (postMedia.includes("videoapi-muybridge.vimeocdn.com")) ?
                            <Carousel.Item>
                                <img src={postMedia} style={{ maxWidth: maxwidth + 'px' }} />
                            </Carousel.Item> : null}
                    </Carousel>
                    :null}
                </div>
            </SliderWrapper> 
            <p></p>
        </>);
}


export default connect(CarouselAsynch);
const SliderWrapper = styled.div`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;

  .carousel{
    width: '100%';
    flex:1;
  }
  .wrappedContent{
    width: '100%'
  } 
  img{
    max-height = 220px;
  }
  .player-wrapper {
    width: auto; // Reset width
    height: auto; // Reset height
  }
  .react-player {
    padding-top: 56.25%; // Percentage ratio for 16:9
    position: relative; // Set to relative
  }
  
  .react-player > div {
    position: absolute; // Scaling will occur since parent is relative now
  }
 
  .carousel-control-next{
      display:hidden;
  }
`;
