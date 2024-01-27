import { Box, Stack, Typography } from "@mui/material";

export const Logo = ({
  titleSize,
  descSize,
  violetBoxSize,
  gap,
  letterSpacing,
}: {
  titleSize: string;
  descSize: string;
  violetBoxSize: string;
  gap: string;
  letterSpacing: string;
}) => {
  // here to adjust the violet box size

  return (
    <Box>
      <Stack color={`white`} direction={`row`} gap={letterSpacing}>
        <Typography
          color={`#764f96`}
          fontSize={titleSize}
          variant="h1"
          fontFamily={`monospace`}
          // fix the font family issue
          sx={{
            lineHeight: 1,
          }}
        >
          I
        </Typography>
        <Box position={`relative`} zIndex={1}>
          <Typography
            fontSize={titleSize}
            color={`white`}
            variant="h1"
            fontFamily={`monospace`}
            // fix the font family issue
            sx={{
              lineHeight: 1,
            }}
          >
            D
          </Typography>
          <Box
            width={violetBoxSize}
            height={violetBoxSize}
            bgcolor={`#764f96`}
            position={`absolute`}
            top={`50%`}
            left={`52%`}
            sx={{
              transform: `translate(-50%, -50%)`,
            }}
            zIndex={-1}
          >
            <Box
              height={`calc(100% / 10)  `}
              width={`calc(50% + (100% / 10))`}
              bgcolor={`#212121`}
              position={`absolute`}
              top={`60%`}
            ></Box>
            <Box
              width={`calc(100% / 10)`}
              height={`40%`}
              bgcolor={`#212121`}
              left={`50%`}
              position={`absolute`}
              top={`20%`}
            ></Box>
            <Box
              height={`calc(100% / 10)`}
              width={`50%`}
              bgcolor={`#212121`}
              position={`absolute`}
              top={`20%`}
              right={0}
            ></Box>
          </Box>
        </Box>
        <Typography
          fontSize={titleSize}
          color={`white`}
          variant="h1"
          fontFamily={`monospace`}
          // fix the font family issue
          sx={{
            lineHeight: 1,
          }}
        >
          O
        </Typography>
      </Stack>
      <Typography
        color={`white`}
        textAlign={`center`}
        fontSize={descSize}
        mt={gap}

        // fix the font family issue
      >
        I Can Do It !
      </Typography>
    </Box>
  );
};
