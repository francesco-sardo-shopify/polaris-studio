import React from 'react';
import { Page, Card, Text, Button } from '@shopify/polaris';

function Page1() {
  return (
    <Page title="Page 1">
      <Card>
        <Text as="p">This is Page 1 content</Text>
        <Button url="/sourcing-sheet-form">Go to Sourcing Sheet Form</Button>
      </Card>
    </Page>
  );
}

export default Page1; 