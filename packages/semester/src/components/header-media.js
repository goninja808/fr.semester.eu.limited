import { connect, styled } from "frontity";
import Image from "@frontity/components/image";

const HeaderMedia = ({ state, id }) => {
  const media = state.source.attachment[id];

  if (!media) return null;

  const srcset =
    Object.values(media.media_details.sizes)
      // Get the url and width of each size.
      .map((item) => [item.source_url, item.width])
      // Recude them to a string with the format required by `srcset`.
      .reduce(
        (final, current, index, array) =>
          final.concat(
            `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
          ),
        ""
      ) || null;

  return (
    <Container isAmp={state.frontity.mode === "amp"}>
      <StyledImage
        alt={media.title.rendered}
        
        src={media.source_url}
        srcSet={srcset}
        width={media?.media_details?.width}
        height={media?.media_details?.height}
      />
    </Container>
  );
};

export default connect(HeaderMedia);

const Container = styled.div`
margin-top: 20px;
margin-bottom: 20px;
  height: 300px;
  ${({ isAmp }) => isAmp && "position: relative;"};
`;

const StyledImage = styled(Image)`
padding: 0px; 
border: 40px;
width: 100%;
height: 100%; 
box-sizing: content-box; 
-webkit-box-sizing: content-box;
`;
