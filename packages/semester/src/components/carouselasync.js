import React, { Component } from "react";
import { connect, styled } from "frontity";
import ReactPlayer from "react-player/lazy";
import Carousel from 'react-bootstrap/Carousel'
import Slider from "react-slick";

const CarouselAsynch = ({ state, initMedia, preMedia, postMedia }) => {


    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            /*style={{ ...style, display: "block", background: "green" }}*/
            onClick={onClick}
          />
        );
      }
      
      function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            /*style={{ ...style, display: "block", background: "red" }}*/
            onClick={onClick}
          />
        );
      }

    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: false,
        autoplay: false,
        speed: 10000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        fade: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
  
        swipeToSlide: true,
        afterChange: function(index) {
            console.log(
              `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
            );
          }
    };

    

    return (
        <>
            <SliderWrapper>
                <div>
                    <Slider {...settings}>
                    {initMedia ?
                            <div>
                                <img src={initMedia} />
                            </div> : null}
                        <div> <img src="https://fr-semester.blog/wp-content/uploads/2022/01/intro-low1.gif" /></div>
                        {preMedia && !(preMedia.includes("videoapi-muybridge.vimeocdn.com")) ?
                            <div>
                                <ReactPlayer url={preMedia + "?quality=240p"}
                                    playing={false} autoPlay={false} light={true}
                                    loop={false} muted={false} width='100%'
                                    config={{
                                        youtube: {
                                            playerVars: { showinfo: 1, }
                                        },
                                        vimeo: {
                                            playerOptions: { quality: '240p', }
                                        },
                                        file: {
                                            attributes: { controlsList: "nofullscreen", },
                                        },
                                    }}
                                />  </div> : null}
                        {preMedia && (preMedia.includes("videoapi-muybridge.vimeocdn.com")) ?
                            <div>
                                <img src={preMedia} />
                            </div> : null}
                        {postMedia && !(postMedia.includes("videoapi-muybridge.vimeocdn.com")) ? <div>
                            <ReactPlayer url={postMedia + "?quality=240p"}
                                playing={false} autoPlay={false} light={true}
                                loop={false} muted={true} width='100%'
                                config={{
                                    youtube: {
                                        playerVars: { showinfo: 1, }
                                    },
                                    vimeo: {
                                        playerOptions: { quality: '240p', }
                                    },
                                    file: {
                                        attributes: { controlsList: "nofullscreen", },
                                    },
                                }}
                            /></div> : null}
                        {postMedia && (postMedia.includes("videoapi-muybridge.vimeocdn.com")) ?
                            <div>
                                <img src={postMedia} />
                            </div> : null}
                    </Slider>
                </div>
            </SliderWrapper>

        </>);
}


export default connect(CarouselAsynch);
const SliderWrapper = styled.div`
  align-item:center; 
`;