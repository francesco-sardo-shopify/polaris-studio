import {
  Page,
  IndexTable,
  Card,
  Text,
  Badge,
  Box,
  BlockStack,
  Button,
  useIndexResourceState,
  Tabs,
} from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface Campaign {
  id: string;
  name: string;
  status: 'Draft' | 'Active' | 'Scheduled';
  createdDate: string;
  connections: number;
  totalOrders: number;
  averageOrderValue: number;
  totalSales: number;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale 2024',
    status: 'Active',
    createdDate: '2024-03-15',
    connections: 150,
    totalOrders: 1234,
    averageOrderValue: 75.50,
    totalSales: 93167.00,
  },
  {
    id: '2',
    name: 'Spring Collection Launch',
    status: 'Scheduled',
    createdDate: '2024-03-14',
    connections: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    totalSales: 0,
  },
  // Add more mock data as needed
];

export default function Campaigns() {
  const [selectedTab, setSelectedTab] = useState(0);
  const {selectedResources, allResourcesSelected, handleSelectionChange} = 
    useIndexResourceState(MOCK_CAMPAIGNS);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const renderStatus = (status: Campaign['status']) => {
    const statusMap: Record<Campaign['status'], {tone: 'info' | 'success' | 'new', label: string}> = {
      Draft: {tone: 'info', label: 'Draft'},
      Active: {tone: 'success', label: 'Active'},
      Scheduled: {tone: 'new', label: 'Scheduled'},
    };
    const {tone, label} = statusMap[status];
    return <Badge tone={tone}>{label}</Badge>;
  };

  const tabs = [
    {
      id: 'all',
      content: 'All',
      accessibilityLabel: 'All campaigns',
      panelID: 'all-campaigns',
    },
    {
      id: 'active',
      content: 'Active',
      accessibilityLabel: 'Active campaigns',
      panelID: 'active-campaigns',
    },
    {
      id: 'draft',
      content: 'Draft',
      accessibilityLabel: 'Draft campaigns',
      panelID: 'draft-campaigns',
    },
    {
      id: 'scheduled',
      content: 'Scheduled',
      accessibilityLabel: 'Scheduled campaigns',
      panelID: 'scheduled-campaigns',
    },
  ];

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelectedTab(selectedTabIndex),
    [],
  );

  const rowMarkup = MOCK_CAMPAIGNS.map(
    ({
      id,
      name,
      status,
      createdDate,
      connections,
      totalOrders,
      averageOrderValue,
      totalSales,
    }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{renderStatus(status)}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" variant="bodyMd">
            {createdDate}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" variant="bodyMd" alignment="end">
            {connections}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" variant="bodyMd" alignment="end">
            {totalOrders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" variant="bodyMd" alignment="end">
            {formatCurrency(averageOrderValue)}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" variant="bodyMd" alignment="end">
            {formatCurrency(totalSales)}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Page
      title="Campaigns"
      primaryAction={
        <Button variant="primary">Create campaign</Button>
      }
    >
      <BlockStack gap="400">
        <Card>
          <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange} />
          <IndexTable
            resourceName={{singular: 'campaign', plural: 'campaigns'}}
            itemCount={MOCK_CAMPAIGNS.length}
            selectedItemsCount={
              allResourcesSelected ? 'All' : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            headings={[
              {title: 'Campaign Name'},
              {title: 'Status'},
              {title: 'Created Date'},
              {title: 'Connections', alignment: 'end'},
              {title: 'Total Orders', alignment: 'end'},
              {title: 'Avg Order Value', alignment: 'end'},
              {title: 'Total Sales', alignment: 'end'},
            ]}
          >
            {rowMarkup}
          </IndexTable>
        </Card>
      </BlockStack>
    </Page>
  );
} 