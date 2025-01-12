import { Grid } from '@nextui-org/react';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

import useMediaQuery from '~/hooks/useMediaQuery';
import { IMedia } from '~/services/tmdb/tmdb.types';
import MediaItem from '../item';

const MediaListGrid = ({
  items,
  genresMovie,
  genresTv,
  isCoverCard,
  coverItem,
  virtual,
}: {
  items?: IMedia[];
  genresMovie?: { [id: string]: string };
  genresTv?: { [id: string]: string };
  isCoverCard?: boolean;
  coverItem?: { id: number; name: string; backdropPath: string }[];
  virtual?: boolean;
}) => {
  const isXs = useMediaQuery(370);
  if (isCoverCard) {
    return (
      <Grid.Container gap={1} justify="flex-start" alignItems="stretch" wrap="wrap">
        {coverItem &&
          coverItem?.length > 0 &&
          coverItem.map((item, index) => {
            const href = `/collections/${item.id}`;
            return (
              <Grid xs={12} md={6} xl={4} key={item.id} justify={isXs ? 'center' : 'flex-start'}>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.05 * index }}
                >
                  <Link to={href}>
                    <MediaItem
                      key={item.id}
                      type="card"
                      coverItem={item}
                      isCoverCard={isCoverCard}
                    />
                  </Link>
                </motion.div>
              </Grid>
            );
          })}
      </Grid.Container>
    );
  }
  return (
    <Grid.Container gap={1} justify="flex-start" alignItems="stretch" wrap="wrap">
      {items &&
        items?.length > 0 &&
        items.map((item, index) => {
          const href = `${item.mediaType === 'movie' ? '/movies/' : '/tv-shows/'}${item.id}/`;
          return (
            <Grid
              xs={isXs ? 12 : 6}
              sm={4}
              md={3}
              lg={2.4}
              xl={2}
              key={item.id}
              justify={isXs ? 'center' : 'flex-start'}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.05 * index }}
              >
                <Link to={href}>
                  <MediaItem
                    key={item.id}
                    type="card"
                    item={item}
                    genresMovie={genresMovie}
                    genresTv={genresTv}
                    virtual={virtual}
                  />
                </Link>
              </motion.div>
            </Grid>
          );
        })}
    </Grid.Container>
  );
};

export default MediaListGrid;
