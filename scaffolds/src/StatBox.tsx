import React from 'react';
import { Card, Text, Box } from '@shopify/polaris';
import { ArrowUpIcon, ArrowDownIcon } from '@shopify/polaris-icons';
import { SparkLineChart } from '@shopify/polaris-viz';
import '@shopify/polaris-viz/build/esm/styles.css';

interface StatBoxProps {
  title: string;
  value: number | string;
  data?: number[];
}

export const StatBox: React.FC<StatBoxProps> = ({ title, value, data = [] }) => {
  const hasData = data && data.length > 1;
  const percentageChange = hasData
    ? getPercentageChange(Number(data[0]), Number(data.at(-1)))
    : 0;

  return (
    <Card padding='0'>
      <Box paddingBlock='400' paddingInlineStart='400'>
        <div
          style={{
            height: 65,
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: '16px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'end',
              minWidth: 30
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -8,
                left: -2,
                zIndex: 20
              }}
            >
              <Text as='p' variant='headingSm'>
                {title}
              </Text>
            </div>
            <Text as='h2' variant='headingLg' fontWeight='bold'>
              {value}
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: -4 }}>
              {percentageChange ? (
                percentageChange > 0 ? (
                  <ArrowUpIcon style={{ height: 12, width: 12 }} fill={'green'} />
                ) : (
                  <ArrowDownIcon style={{ height: 12, width: 12 }} fill={'red'} />
                )
              ) : null}
              <Text as='p' variant='bodySm' tone='subdued'>
                <span
                  style={
                    percentageChange
                      ? {
                          color: percentageChange > 0 ? 'green' : 'red'
                        }
                      : undefined
                  }
                >
                  {Math.abs(percentageChange) || '-'}%
                </span>
              </Text>
            </div>
          </div>
          {hasData && (
            <div style={{ 
              flex: 1, 
              width: '50%', 
              height: '80%', 
              alignSelf: 'end',
              marginLeft: '16px'
            }}>
              <SparkLineChart 
                offsetLeft={4} 
                offsetRight={4}
                data={formatChartData(data)} 
              />
            </div>
          )}
        </div>
      </Box>
    </Card>
  );
};

interface ChartDataPoint {
  key: number;
  value: number;
}

const formatChartData = (values: number[] = []): Array<{data: ChartDataPoint[]}> => {
  if (!values?.length) return [{ data: [] }];
  return [{
    data: values.map((stat, idx) => ({
      key: idx,
      value: Number(stat) || 0
    }))
  }];
};

const getPercentageChange = (start = 0, end = 0) => {
  if (!start || !end || isNaN(start) || isNaN(end)) return 0;

  const percentage = Number((((end - start) / start) * 100).toFixed(0));
  return Math.max(Math.min(percentage, 999), -999);
};
