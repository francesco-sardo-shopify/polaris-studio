# Product Requirements Document: Building New Pages

## Overview
This document outlines the architectural patterns and best practices for building new pages in our Shopify-based application using Polaris components. This guide is intended for engineers implementing new features while maintaining consistency with our existing prototype.

## Technical Stack
- React 18+
- TypeScript
- Shopify Polaris UI Framework V12, not V11
- React Router v6

## Polaris Component Guidelines

### 1. Component Selection Priority
Always check the local examples and documentation first before implementing custom solutions:
1. Review examples in `polaris-main/polaris.shopify.com/pages/examples/`
2. Combine existing Polaris components before creating custom ones
3. Only create custom components when Polaris alternatives don't exist

### 2. Key Component Examples
Reference these example implementations for common UI patterns:

| UI Need | Example File |
|---------|-------------|
| Data Tables | `polaris-main/polaris.shopify.com/pages/examples/index-filters-default.tsx` |
| Forms | `polaris-main/polaris.shopify.com/pages/examples/form-layout-default.tsx` |
| Filters | `polaris-main/polaris.shopify.com/pages/examples/filters-with-a-submit-button.tsx` |
| Actions | `polaris-main/polaris.shopify.com/pages/examples/button-default.tsx` |
| Layout | `polaris-main/polaris.shopify.com/pages/examples/page-default.tsx` |

### 3. Component Best Practices

Follow the patterns shown in the example files:

- IndexTable patterns: See `polaris-main/polaris.shopify.com/pages/examples/index-filters-default.tsx`
- Form patterns: See `polaris-main/polaris.shopify.com/pages/examples/form-layout-default.tsx`
- Filter patterns: See `polaris-main/polaris.shopify.com/pages/examples/filters-with-a-submit-button.tsx`

### 4. Component Variants

Always use modern Polaris component variants as documented in the [Polaris changelog](https://github.com/Shopify/polaris/blob/main/CHANGELOG.md):

- ✅ `BlockStack` instead of ❌ vertical `Stack` ([BlockStack docs](https://polaris.shopify.com/components/blockStack))
- ✅ `InlineStack` instead of ❌ horizontal `Stack` ([InlineStack docs](https://polaris.shopify.com/components/inlineStack))
- ✅ `Text` with `as` prop instead of ❌ raw HTML text elements ([Text docs](https://polaris.shopify.com/components/text))
- ✅ `Button` with `variant` instead of ❌ `plain` prop ([Button docs](https://polaris.shopify.com/components/button))
- ✅ `tone="critical"` instead of ❌ `destructive` ([Button docs](https://polaris.shopify.com/components/button#navigation))
- ✅ `Box` for padding and spacing (including inside Cards) instead of ❌ direct padding or Card.Section

### 5. Polaris Hooks

Prefer Polaris hooks over custom implementations:
- `useIndexResourceState` for table selection
- `useBreakpoints` for responsive design
- `useSetIndexFiltersMode` for resource filtering
- `useToggle` for boolean state

### 6. Component Extension

When extending Polaris components:
1. Wrap existing components rather than creating new ones
2. Maintain Polaris prop patterns
3. Follow Polaris naming conventions
4. Preserve accessibility features

Example:
```typescript
// ✅ Correct
interface EnhancedCardProps extends CardProps {
  customProp?: string;
}

// ❌ Avoid
interface CustomCardProps {
  // Reimplementing Polaris props
  title?: string;
  children?: React.ReactNode;
}
```

### TextField Requirements
All Polaris TextField components require specific props to satisfy TypeScript:

```typescript
// ❌ Incorrect - missing required props
<TextField
  value={value}
  onChange={handleChange}
/>

// ✅ Correct - includes required props
<TextField
  label="Input name"          // Required: All TextFields need a label
  labelHidden                 // Optional: Use if label should be visually hidden
  autoComplete="off"          // Required: Must specify autoComplete
  value={value}
  onChange={handleChange}
/>
```

## Page Architecture

### 1. Base Structure
All pages should follow one of two core layout patterns:

#### Two-Column Layout
- Use for pages with supplementary information or actions
- Reference: `polaris-main/polaris.shopify.com/pages/examples/page-with-custom-primary-action.tsx`
- Structure:
  - Main content in primary section
  - Related actions/info in `oneThird` variant section
  - Ideal for detail pages, settings, or complex forms

```typescript
<Page title="Feature Name">
  <Layout>
    <Layout.Section>
      {/* Main content */}
    </Layout.Section>
    <Layout.Section variant="oneThird">
      {/* Sidebar content */}
    </Layout.Section>
  </Layout>
</Page>
```

#### Single-Column Layout
- Use for list views, dashboards, or focused content
- Reference: `polaris-main/polaris.shopify.com/pages/examples/page-default.tsx`
- Structure:
  - Full-width content area
  - Can contain multiple Layout.Section components stacked vertically
  - Ideal for data tables and grid layouts

```typescript
<Page title="Feature Name">
  <Layout>
    <Layout.Section>
      {/* Primary content */}
    </Layout.Section>
    <Layout.Section>
      {/* Additional sections as needed */}
    </Layout.Section>
  </Layout>
</Page>
```

### 2. Component Organization

#### Main Content Area
- Use `BlockStack` for vertical spacing between components
- Wrap major sections in `Card` components
- Implement `gap="400"` as the standard spacing between cards

#### Sidebar (Two-Column Layout)
- Always use `variant="oneThird"` for consistency
- Contains supplementary information like status, metadata, or additional actions
- Should be shorter than the main content area

## Key Patterns

### 1. Form Handling
- Use controlled components for all form inputs
- Implement `isDirty` state for unsaved changes
- Show `ContextualSaveBar` when changes are detected
- Always include `autoComplete="off"` prop on Polaris TextField components to satisfy TypeScript requirements

### 2. Navigation
- Use React Router's `useNavigate` for programmatic navigation
- Implement back actions consistently
- Keep routing structure flat where possible

### 3. Data Management
- Start with static data for prototypes
- Structure data interfaces clearly using TypeScript
- Prepare for future API integration

### 4. TypeScript Best Practices
- Define interfaces for all state objects before using useState
- Use explicit typing for useState: `useState<InterfaceName>(initialValue)`
- Avoid implicit 'any' types in callbacks and event handlers
- Type all component props using interfaces, not type aliases
- Note: Polaris `SubNavigationItem` type does not support the `selected` property - selection state should be handled by the parent Navigation.Item's `selected` prop only
- Always type callback parameters in component props, especially for modals and event handlers:
```typescript
// ❌ Incorrect
onAdd={(mode) => {}}

// ✅ Correct
onAdd={(mode: InterfaceName) => {}}
```

#### Form State Typing
- Define complete interfaces for form/modal state before implementation
- Use discriminated unions for different form variants:
```typescript
// ❌ Avoid
interface State {
  settings: {};  // Too permissive
}

// ✅ Correct
interface State {
  type: 'wholesale' | 'dropship';
  settings: {
    price?: number;
    commission?: number;
    // ... other known properties
  };
}
```

#### Discriminated Union Patterns
When dealing with different types of settings or configurations that vary based on a type field:

```typescript
// ❌ Avoid
interface SourcingMode {
  type: 'wholesale' | 'dropship' | 'ads';
  settings: WholesaleSettings | DropshipSettings | AdsSettings; // Too permissive
}

// ✅ Correct
interface SourcingMode {
  type: 'wholesale';
  settings: WholesaleSettings;
} | {
  type: 'dropship';
  settings: DropshipSettings;
} | {
  type: 'ads';
  settings: AdsSettings;
}
```

This pattern:
- Ensures type safety without manual type assertions
- Enables TypeScript to infer correct types based on discriminator field
- Prevents runtime errors from mismatched settings types
- Eliminates need for type casting in switch statements

Example usage:
```typescript
function handleSettings(mode: SourcingMode) {
  switch (mode.type) {
    case 'wholesale':
      // TypeScript knows mode.settings is WholesaleSettings
      return mode.settings.price;
    case 'dropship':
      // TypeScript knows mode.settings is DropshipSettings
      return mode.settings.commission;
  }
}
```

## Polaris-Specific Guidelines

### Modern Patterns
Use these newer Polaris components instead of legacy ones:
- `BlockStack` instead of vertical `Stack`
- `InlineStack` instead of horizontal `Stack`
- `Box` for padding and spacing (including inside Cards)
- `Text` component for typography
- Use `variant` prop instead of `plain` prop for buttons
- Use `tone="critical"` instead of `destructive` for buttons

### Card Patterns
Never use `Card.Section` - it's a legacy pattern. Instead, use `Box` for internal Card spacing:

```typescript
// ❌ Incorrect - using Card.Section
<Card>
  <Card.Section>
    <div style={{ padding: '16px' }}>
      Content
    </div>
  </Card.Section>
</Card>

// ✅ Correct - using Box
<Card>
  <Box padding="400">
    Content
  </Box>
</Card>
```

Common Card spacing patterns:
```typescript
// Basic card with padding
<Card>
  <Box padding="400">
    <Text as="h2" variant="headingMd">Title</Text>
    <Box paddingBlockStart="400">
      Content
    </Box>
  </Box>
</Card>

// Card with multiple sections
<Card>
  <Box padding="400">
    <BlockStack gap="400">
      <div>Section 1</div>
      <Box borderBlockStart="base">Section 2</Box>
    </BlockStack>
  </Box>
</Card>
```

### Component Hierarchy
```typescript
<BlockStack gap="400">
  <Card>
    <BlockStack gap="200">
      <Text variant="headingMd" as="h2">Section Title</Text>
      <Box paddingBlockStart="200">
        {/* Content */}
      </Box>
    </BlockStack>
  </Card>
</BlockStack>
```

### Heading Patterns
Follow the patterns shown in the changesets and example files:
- See: `polaris-main/.changeset/forty-eyes-kiss.md` for navigation patterns
- See: `polaris-main/.changeset/perfect-pans-shop.md` for action guidelines

### Text Component Usage
All Text components must specify their semantic HTML element using the `as` prop:
- For headings: `as="h1"` through `as="h6"`
- For paragraphs: `as="p"`
- For inline text: `as="span"`
- For term definitions: `as="dt"` or `as="dd"`

Examples:
```typescript
// ❌ Incorrect - missing semantic element
<Text>Regular text</Text>
<Text variant="headingSm">Section title</Text>

// ✅ Correct - semantic elements specified
<Text as="p">Regular text</Text>
<Text variant="headingSm" as="h3">Section title</Text>
```

### TypeScript Enforcement
To ensure proper Text component usage:
1. Consider implementing an ESLint rule that requires the `as` prop on Text components
2. Use TypeScript's strict mode
3. Reference the Text component's type definition from `@shopify/polaris`:
   ```typescript
   import type {TextProps} from '@shopify/polaris';
   ```

Common Text Component Patterns:
```typescript
// Page structure
<Page title="Feature Title"> {/* h1 is automatically applied */}
  <Card>
    <BlockStack gap="200">
      <Text variant="headingMd" as="h2">Section Title</Text>
      <Text as="p">Descriptive text</Text>
      
      <Card>
        <Text variant="headingSm" as="h3">Subsection Title</Text>
        <Text as="p">More content</Text>
      </Card>
    </BlockStack>
  </Card>
</Page>

// Data display
<BlockStack gap="200">
  <Text variant="headingSm" as="h3">Statistics</Text>
  <Text as="p">Potential new products: 150+</Text>
  <Text as="p">Est. revenue: $25,000 USD</Text>
</BlockStack>
```

## State Management
Reference the patterns shown in:
- `polaris-main/polaris.shopify.com/pages/examples/index-filters-default.tsx` for data table state
- `polaris-main/polaris.shopify.com/pages/examples/form-layout-default.tsx` for form state

## Notes
- This is a prototype - focus on functionality over perfect implementation
- Use TypeScript interfaces for all data structures

## Route Management

Every new page requires updates to App.tsx:

```typescript:src/App.tsx
// 1. Import component
import NewFeaturePage from './NewFeaturePage';

// 2. Add route
<Routes>
  <Route path="/feature-path" element={<NewFeaturePage />} />
</Routes>

// 3. Add navigation (if needed)
<Navigation.Section
  items={[
    {
      url: '/feature-path',
      label: 'Feature Name',
      icon: FeatureIcon,
      selected: location.pathname === '/feature-path',
    },
  ]}
/>
```

Also add a link to the new page on Page1.tsx:
```typescript:src/Page1.tsx
<Link url="/feature-path">Feature Name</Link>
```