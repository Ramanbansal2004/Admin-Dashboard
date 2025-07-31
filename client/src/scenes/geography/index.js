import React from 'react'
import { useGetGeographyQuery } from 'state/api';
import { useTheme, Box } from '@mui/material';
import Header from 'components/Header';
import { ResponsiveChoropleth } from '@nivo/geo';
import { geoData } from 'state/geoData';
const Geography = () => {
    const theme = useTheme();
    const {data}= useGetGeographyQuery();
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="Geography" subtitle="Find where your users are located." />
        <Box marginTop="40px" height="75vh" border={`1px solid ${theme.palette.secondary[200]}`} borderRadius="4px">
            {data?<ResponsiveChoropleth /* or Choropleth for fixed dimensions */
        data={data}
        features={geoData.features}
        theme={{
            axis: {
                domain: {
                    line: {
                        stroke: theme.palette.secondary[200],
                    },
                },
                legend: {
                    text: {
                        fill: theme.palette.secondary[200],
                    },
                },
                ticks: {
                    line: {
                        stroke: theme.palette.secondary[200],
                        strokeWidth: 1,
                    },
                    text: {
                        fill: theme.palette.secondary[200],
                    },
                },
            },
            legends: {
                text: {
                    fill: theme.palette.secondary[200],
                },
            },
            tooltip: {
                container: {
                    color: theme.palette.primary.main,
                },
            },
        }}
        margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
        colors="nivo"
        domain={[0, 60]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={150}
        projectionTranslation={[0.45, 0.6]}
        projectionRotation={[0, 0, 0]}
        borderWidth={1.3}
        borderColor="#152538"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18
            }
        ]}
    />:<div>Loading...</div>}
        </Box>
    </Box>
  )
}

export default Geography