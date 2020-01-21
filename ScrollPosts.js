import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { set, get, uniqBy } from 'lodash';

/**
 * Component that adds Infinite scroll functionality to UI
 */
const ScrollPosts = ({
                          data,
                          dataKey,
                          fetchMore,
                          variables,
                          count,
                          children,
                        }) => {

  const loadMore = () => {
    console.log('load more')
    return fetchMore({
      variables: { ...variables, skip: data.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        const previousData = get(prev, dataKey);
        const fetchMoreData = get(fetchMoreResult, dataKey);
        return set(
          prev,
          dataKey,
          uniqBy([...previousData, ...fetchMoreData], 'id')
        );
      },
    });
  };
  console.log("our final data is..........",data)
  return children(data,loadMore);
};

ScrollPosts.propTypes = {
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  fetchMore: PropTypes.func.isRequired,
  variables: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
};

export default ScrollPosts;
