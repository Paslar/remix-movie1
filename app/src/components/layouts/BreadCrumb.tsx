import { RouteMatch, useLocation } from '@remix-run/react';
import { Grid, Spacer, Text } from '@nextui-org/react';
import useMediaQuery from '~/hooks/useMediaQuery';

interface IBreadCrumbProps {
  matches: RouteMatch[];
}

const BreadCrumb = (props: IBreadCrumbProps) => {
  const { matches } = props;
  const isXs = useMediaQuery(425, 'max');
  const location = useLocation();
  if (
    location.pathname === '/' ||
    location.pathname === '/anime' ||
    location.pathname === '/movies' ||
    location.pathname === '/tv-shows'
  )
    return null;
  return (
    <Grid.Container
      justify="flex-start"
      alignItems="center"
      gap={2}
      wrap="nowrap"
      css={{
        position: 'absolute',
        width: 'fit-content',
        height: 25,
        padding: 0,
        margin: `${isXs ? '64px 0 0 8px !important' : '64px 0 0 88px !important'}`,
        zIndex: 1,
      }}
    >
      {matches
        // skip routes that don't have a breadcrumb
        .filter((match) => match.handle && match.handle.breadcrumb)
        // render breadcrumbs!
        .map((match, index) => (
          <Text color="primary" span key={index} style={{ display: 'flex', flexDirection: 'row' }}>
            {index ? (
              <>
                <Spacer x={0.5} />
                <span> ❱ </span>
                <Spacer x={0.5} />
              </>
            ) : null}
            {match?.handle?.breadcrumb(match)}
          </Text>
        ))}
    </Grid.Container>
  );
};

export default BreadCrumb;
