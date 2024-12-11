import React from 'react';
import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  TextField,
  Select,
  Checkbox,
  DropZone,
  Badge,
  InlineStack,
  InlineGrid,
  Button,
  List,
  Icon,
  FormLayout,
  Tooltip,
  Image,
  Thumbnail,
} from '@shopify/polaris';
import { MenuHorizontalIcon, LockIcon, CheckSmallIcon, StarFilledIcon, InfoIcon } from '@shopify/polaris-icons';
import './Products.css';

// Define the props for SmallTooltip
interface SmallTooltipProps {
  content: string;
}

// Add this new component
const SmallTooltip: React.FC<SmallTooltipProps> = ({ content }) => (
  <Tooltip content={content}>
    <Icon source={LockIcon} tone="subdued" />
  </Tooltip>
);

const ProductBrand: React.FC = () => {
  return (
    <Page 
      title="Bluestar Printer"
      backAction={{content: 'Products', url: '#'}}
      titleMetadata={
        <InlineStack gap="200">
          <Badge tone="success">Active</Badge>
          <Badge tone="success" icon={CheckSmallIcon}>Verified</Badge>
        </InlineStack>
      }
      compactTitle
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {
          content: 'Duplicate',
          accessibilityLabel: 'Secondary action label',
          onAction: () => alert('Duplicate action'),
        },
        {
          content: 'Preview',
          onAction: () => alert('View on your store action'),
        },
      ]}
      actionGroups={[
        {
          title: 'Brand',
          actions: [
            {
              content: 'Ownership verification',
            },
            {
              content: 'Controls',
            }
          ],
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            <Card>
              <BlockStack gap="100">
                <InlineStack align="start">
                  <Text variant="bodyMd" as="span">Title</Text>
                  <SmallTooltip content="Controls have been configured for this field" />
                </InlineStack>
                <TextField
                  label=""
                  labelHidden
                  autoComplete="off"
                  value="Bluestar 39461110 STAR MICRONICS, TSP143U GRY, THERMAL, PRINTER, 2 COLOR, CUTTER, INCLUDES USB CABLE"
                />
                <TextField
                  label="Description"
                  multiline={4}
                  autoComplete="off"
                  value="The Bluestar 39461110 is a high-speed thermal receipt printer designed for retail and hospitality environments. With its compact design and reliable performance, it's perfect for printing receipts, tickets, and labels."
                />
                <InlineStack align="start">
                  <Text variant="bodyMd" as="span">Title</Text>
                  <SmallTooltip content="Controls have been configured for this field" />
                </InlineStack>
                <InlineStack gap="200">
                  <Thumbnail
                    source="/images/printerimage1.jpg"
                    alt="Product image 1"
                    size="large"
                  />
                  <Thumbnail
                    source="/images/printerimage2.jpg"
                    alt="Product image 2"
                    size="large"
                  />
                  <Thumbnail
                    source="/images/printerimage3.jpg"
                    alt="Product image 3"
                    size="large"
                  />
                  <Thumbnail
                    source="/images/printerimage4.jpg"
                    alt="Product image 3"
                    size="large"
                  />
                  <div style={{width: 114, height: 114}}>
                    <DropZone type='image'>
                      <DropZone.FileUpload/>
                    </DropZone>
                  </div>
                </InlineStack>

                <Select 
                  label="Category" 
                  options={[
                    {label: 'Printers', value: 'printers'},
                    {label: 'Point of Sale', value: 'pos'},
                    {label: 'Hardware', value: 'hardware'}
                  ]} 
                  value="printers"
                />
              </BlockStack>
            </Card>
            <Card>
              <Text variant="headingMd" as="h2">Pricing</Text>
              <BlockStack gap="400">
                <FormLayout>
                  <FormLayout.Group>
                    <div>
                      <InlineStack align="start" gap="100">
                        <Text variant="bodyMd" as="span">Price</Text>
                        <SmallTooltip content="Controls have been configured for this field" />
                      </InlineStack>
                      <TextField
                        label=""
                        labelHidden
                        type="number"
                        autoComplete="off"
                        prefix="$"
                        value="199.99"
                      />
                    </div>
                    <div>
                      <InlineStack align="start" gap="100">
                        <Text variant="bodyMd" as="span">Compare at price</Text>
                        <SmallTooltip content="Controls have been configured for this field" />
                      </InlineStack>
                      <TextField
                        label=""
                        labelHidden
                        type="number"
                        autoComplete="off"
                        prefix="$"
                        value="249.99"
                      />
                    </div>
                  </FormLayout.Group>
                </FormLayout>
                <Checkbox label="Charge tax" checked={true} />
                <InlineStack wrap={false} gap="200" align="start">
                  <TextField
                    label="Cost per item"
                    type="number"
                    autoComplete="off"
                    prefix="$"
                    value="150.00"
                  />
                  <TextField
                    label="Profit"
                    type="number"
                    autoComplete="off"
                    prefix="$"
                    value="49.99"
                  />
                  <TextField
                    label="Margin"
                    type="number"
                    autoComplete="off"
                    suffix="%"
                    value="25"
                  />
                </InlineStack>
              </BlockStack>
            </Card>

            <Card>
              <Text variant="headingMd" as="h2">Inventory</Text>
              <BlockStack gap="200">
                <Select 
                  label="Inventory location" 
                  options={[
                    {label: 'Main Warehouse', value: 'main'},
                    {label: 'Store Front', value: 'store'}
                  ]}
                  value="main"
                />
                <FormLayout.Group condensed>
                  <TextField
                    label="SKU (Stock Keeping Unit)"
                    autoComplete="off"
                    value="BST-39461110-BLK"
                  />
                  <TextField
                    label="Barcode (ISBN, UPC, GTIN, etc.)"
                    autoComplete="off"
                    value="OIJAS9234239A"
                  />
                </FormLayout.Group>
                <Checkbox label="Track quantity" checked={true} />
                <Checkbox label="Continue selling when out of stock" checked={false} />
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <BlockStack gap="400">
            <Card>
              <BlockStack gap="200">
                <Text variant="headingMd" as="h2">Status</Text>
                <Select 
                  label="Status"
                  options={[
                    { label: 'Active', value: 'active' },
                    { label: 'Draft', value: 'draft' }
                  ]} 
                  value="active"
                />
              </BlockStack>
            </Card>
            <Card roundedAbove="sm">
              <BlockStack gap="200">
                <InlineGrid columns="1fr auto">
                  <Text as="h2" variant="headingSm">
                    Distribution Sheets
                  </Text>
                  <Icon 
                    source={MenuHorizontalIcon} 
                    tone="subdued"
                  />
                </InlineGrid>
                <div className="green-dot-list">
                  <List>
                    <List.Item>Dropshipping Program</List.Item>
                    <List.Item>Wholesale Distribution</List.Item>
                  </List>
                </div>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200">
                <Text variant="headingMd" as="h2">Publishing</Text>
                <BlockStack gap="100">
                  <Text variant="headingSm" as="h3">Sales channels</Text>
                  <div className="green-dot-list">
                    <List>
                      <List.Item>Online Store</List.Item>
                      <List.Item>Collective (Supplier), Point of Sale, and Inbox</List.Item>
                    </List>
                  </div>
                  
                  <Text variant="headingSm" as="h3">Markets</Text>
                  <div className="green-dot-list">
                    <List>
                      <List.Item>Canada, International, United Kingdom, and 1 more</List.Item>
                    </List>
                  </div>
                  <Text variant="headingSm" as="h3">Retailers</Text>
                  <div className="green-dot-list">
                    <List>
                      <List.Item>Macy's, Best Buy and 237 more</List.Item>
                    </List>
                  </div>
                </BlockStack>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200">
                <Text variant="headingMd" as="h2">Insights</Text>
                <Text as="p">Summary of recent sales performance</Text>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200">
                <Text variant="headingMd" as="h2">Product Organization</Text>
                <div>
                  <InlineStack align="start" gap="100">
                    <Text variant="bodyMd" as="span">Product type</Text>
                    <SmallTooltip content="Controls have been configured for this field" />
                  </InlineStack>
                  <TextField
                    label=""
                    labelHidden
                    autoComplete="off"
                    value="Thermal Printer"
                  />
                </div>
                <div>
                  <InlineStack align="start" gap="100">
                    <Text variant="bodyMd" as="span">Brand</Text>
                    <SmallTooltip content="Controls have been configured for this field" />
                  </InlineStack>
                  <TextField
                    label=""
                    labelHidden
                    autoComplete="off"
                    value="STAR MICRONICS"
                  />
                </div>
                <TextField
                  label="Collections"
                  autoComplete="off"
                  value="POS Hardware, Printers"
                />
                <TextField
                  label="Tags"
                  autoComplete="off"
                  value="thermal, receipt printer, pos, bluestar"
                />
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200">
                <Text variant="headingMd" as="h2">Theme Template</Text>
                <Select 
                  label="Select theme template" 
                  options={[
                    {label: 'Default product', value: 'default'},
                    {label: 'Hardware product', value: 'hardware'}
                  ]}
                  value="hardware"
                />
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default ProductBrand;
