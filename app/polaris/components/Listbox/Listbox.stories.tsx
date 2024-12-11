import React, {useState} from 'react';
import type {Meta} from '@storybook/react';
import {
  LegacyCard,
  EmptySearchResult,
  Scrollable,
  TextField,
  Icon,
  Listbox,
  LegacyStack,
  AutoSelection,
  BlockStack,
  InlineStack,
  Text,
  Box,
} from '@shopify/polaris';
import {PlusCircleIcon, SearchIcon} from '@shopify/polaris-icons';

export default {
  component: Listbox,
} as Meta<typeof Listbox>;

export const All = {
  parameters: {
    a11y: {config: {rules: [{id: 'aria-required-children', enabled: false}]}},
  },
  render() {
    return (
      /* eslint-disable react/jsx-pascal-case */
      <BlockStack gap="800">
        <BlockStack gap="400">
          <Text as="h2" variant="headingXl">
            Default
          </Text>
          <Default.render />
          <Box paddingBlockEnd="300" />
        </BlockStack>

        <BlockStack gap="200">
          <Text as="h2" variant="headingXl">
            With loading
          </Text>
          <WithLoading.render />
          <Box paddingBlockEnd="300" />
        </BlockStack>

        <BlockStack gap="400">
          <Text as="h2" variant="headingXl">
            With action
          </Text>
          <WithAction.render />
          <Box paddingBlockEnd="300" />
        </BlockStack>

        <BlockStack gap="200">
          <Text as="h2" variant="headingXl">
            With custom element
          </Text>
          <WithCustomOptions.render />
          <Box paddingBlockEnd="300" />
        </BlockStack>

        <BlockStack gap="200">
          <Text as="h2" variant="headingXl">
            With search
          </Text>
          <WithSearch.render />
          <Box paddingBlockEnd="300" />
        </BlockStack>

        <BlockStack gap="200">
          <Text as="h2" variant="headingXl">
            With disabled text option
          </Text>
          <WithDisabledTextOption.render />
        </BlockStack>
        <Box paddingBlockEnd="300" />
      </BlockStack>
      /* eslint-enable react/jsx-pascal-case */
    );
  },
};

export const Default = {
  render() {
    return (
      <Listbox accessibilityLabel="Basic Listbox example">
        <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
        <Listbox.Option value="UniqueValue-2">Item 2</Listbox.Option>
        <Listbox.Option value="UniqueValue-3">Item 3</Listbox.Option>
      </Listbox>
    );
  },
};

export const WithLoading = {
  parameters: {
    a11y: {config: {rules: [{id: 'aria-required-children', enabled: false}]}},
  },
  render() {
    return (
      <Listbox accessibilityLabel="Listbox with loading example">
        <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
        <Listbox.Option value="UniqueValue-2">Item 2</Listbox.Option>
        <Listbox.Option value="UniqueValue-3">Item 3</Listbox.Option>
        <Listbox.Loading accessibilityLabel="loading example" />
      </Listbox>
    );
  },
};

export const WithAction = {
  render() {
    return (
      <Listbox accessibilityLabel="Listbox with Action example">
        <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
        <Listbox.Option value="UniqueValue-2" divider>
          Item 2
        </Listbox.Option>
        <Listbox.Action value="ActionValue">
          <LegacyStack spacing="tight">
            <Icon source={PlusCircleIcon} tone="base" />
            <div>Add item</div>
          </LegacyStack>
        </Listbox.Action>
      </Listbox>
    );
  },
};

export const WithCustomOptions = {
  render() {
    interface CustomerSegment {
      id: string;
      label: string;
      value: string;
      subscribers: number;
    }

    const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);

    const segments: CustomerSegment[] = [
      {
        label: 'All customers',
        id: 'gid://shopify/CustomerSegment/1',
        value: '0',
        subscribers: 23,
      },
      {
        label: 'VIP customers',
        id: 'gid://shopify/CustomerSegment/2',
        value: '1',
        subscribers: 16,
      },
      {
        label: 'New customers',
        id: 'gid://shopify/CustomerSegment/3',
        value: '2',
        subscribers: 2,
      },
      {
        label: 'Abandoned carts - last 30 days',
        id: 'gid://shopify/CustomerSegment/4',
        value: '3',
        subscribers: 108,
      },
    ];

    const handleSegmentSelect = (segmentIndex: string) => {
      setSelectedSegmentIndex(Number(segmentIndex));
    };

    return (
      <Listbox
        onSelect={handleSegmentSelect}
        accessibilityLabel="Listbox with custom element example"
      >
        {segments.map(({label, id, value, subscribers}) => {
          const selected = segments[selectedSegmentIndex].value === value;

          return (
            <Listbox.Option key={id} value={value} selected={selected}>
              <Listbox.TextOption selected={selected}>
                <Box width="100%">
                  <InlineStack gap="200" align="space-between">
                    {label}
                    <Text as="span" tone="subdued">
                      {`${subscribers} subscribers`}
                    </Text>
                  </InlineStack>
                </Box>
              </Listbox.TextOption>
            </Listbox.Option>
          );
        })}
      </Listbox>
    );
  },
};

export const WithSearch = {
  render() {
    interface CustomerSegment {
      id: string;
      label: string;
      value: string;
    }

    const actionValue = '__ACTION__';

    const segments: CustomerSegment[] = [
      {
        label: 'All customers',
        id: 'gid://shopify/CustomerSegment/1',
        value: '0',
      },
      {
        label: 'VIP customers',
        id: 'gid://shopify/CustomerSegment/2',
        value: '1',
      },
      {
        label: 'New customers',
        id: 'gid://shopify/CustomerSegment/3',
        value: '2',
      },
      {
        label: 'Abandoned carts - last 30 days',
        id: 'gid://shopify/CustomerSegment/4',
        value: '3',
      },
      {
        label: 'Wholesale customers',
        id: 'gid://shopify/CustomerSegment/5',
        value: '4',
      },
      {
        label: 'Email subscribers',
        id: 'gid://shopify/CustomerSegment/6',
        value: '5',
      },
      {
        label: 'From New York',
        id: 'gid://shopify/CustomerSegment/7',
        value: '6',
      },
      {
        label: 'Repeat buyers',
        id: 'gid://shopify/CustomerSegment/8',
        value: '7',
      },
      {
        label: 'First time buyers',
        id: 'gid://shopify/CustomerSegment/9',
        value: '8',
      },
      {
        label: 'From Canada',
        id: 'gid://shopify/CustomerSegment/10',
        value: '9',
      },
      {
        label: 'Bought in last 60 days',
        id: 'gid://shopify/CustomerSegment/11',
        value: '10',
      },
      {
        label: 'Bought last BFCM',
        id: 'gid://shopify/CustomerSegment/12',
        value: '11',
      },
    ];

    const lazyLoadSegments: CustomerSegment[] = Array.from(Array(100)).map(
      (_, index) => ({
        label: `Other customers ${index + 13}`,
        id: `gid://shopify/CustomerSegment/${index + 13}`,
        value: `${index + 12}`,
      }),
    );

    segments.push(...lazyLoadSegments);

    const interval = 25;

    const [showFooterAction, setShowFooterAction] = useState(true);
    const [query, setQuery] = useState('');
    const [lazyLoading, setLazyLoading] = useState(false);
    const [willLoadMoreResults, setWillLoadMoreResults] = useState(true);
    const [visibleOptionIndex, setVisibleOptionIndex] = useState(6);
    const [activeOptionId, setActiveOptionId] = useState(segments[0].id);
    const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
    const [filteredSegments, setFilteredSegments] = useState<CustomerSegment[]>(
      [],
    );

    const handleClickShowAll = () => {
      setShowFooterAction(false);
      setVisibleOptionIndex(segments.length);
    };

    const handleFilterSegments = (query: string) => {
      const nextFilteredSegments = segments.filter(
        (segment: CustomerSegment) => {
          return segment.label
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase().trim());
        },
      );

      setFilteredSegments(nextFilteredSegments);
    };

    const handleQueryChange = (query: string) => {
      setQuery(query);

      if (query.length >= 2) handleFilterSegments(query);
    };

    const handleQueryClear = () => {
      handleQueryChange('');
    };

    const handleResetVisibleOptionIndex = () => {
      setVisibleOptionIndex(interval);
    };

    const handleSegmentSelect = (segmentIndex: string) => {
      if (segmentIndex === actionValue) {
        return handleClickShowAll();
      }

      setSelectedSegmentIndex(Number(segmentIndex));
    };

    const handleActiveOptionChange = (_: string, domId: string) => {
      setActiveOptionId(domId);
    };

    /* This is just to illustrate lazy loading state vs loading state. This is an example, so we aren't fetching from GraphQL. You'd use `pageInfo.hasNextPage` from your GraphQL query data instead of this fake "willLoadMoreResults" state along with setting `first` your GraphQL query's variables to your app's default max edges limit (e.g., 250). */

    const handleLazyLoadSegments = () => {
      if (willLoadMoreResults && !showFooterAction) {
        setLazyLoading(true);

        const options = query ? filteredSegments : segments;

        setTimeout(() => {
          const remainingOptionCount = options.length - visibleOptionIndex;
          const nextVisibleOptionIndex =
            remainingOptionCount >= interval
              ? visibleOptionIndex + interval
              : visibleOptionIndex + remainingOptionCount;

          setLazyLoading(false);
          setVisibleOptionIndex(nextVisibleOptionIndex);

          if (remainingOptionCount <= interval) {
            setWillLoadMoreResults(false);
          }
        }, 1000);
      }
    };

    const listboxId = 'SearchableListbox';

    const textFieldMarkup = (
      <div style={{padding: '12px'}}>
        <TextField
          focused={showFooterAction}
          clearButton
          labelHidden
          label="Customer segments"
          placeholder="Search segments"
          autoComplete="off"
          value={query}
          prefix={<Icon source={SearchIcon} />}
          ariaActiveDescendant={activeOptionId}
          ariaControls={listboxId}
          onChange={handleQueryChange}
          onClearButtonClick={handleQueryClear}
        />
      </div>
    );

    const segmentOptions = query ? filteredSegments : segments;

    const segmentList =
      segmentOptions.length > 0
        ? segmentOptions
            .slice(0, visibleOptionIndex)
            .map(({label, id, value}) => {
              const selected = segments[selectedSegmentIndex].value === value;

              return (
                <Listbox.Option key={id} value={value} selected={selected}>
                  <Listbox.TextOption selected={selected}>
                    {label}
                  </Listbox.TextOption>
                </Listbox.Option>
              );
            })
        : null;

    const showAllMarkup = showFooterAction ? (
      <Listbox.Action value={actionValue}>
        <span
          style={{
            color: 'var(--p-color-text-secondary)',
          }}
        >
          Show all 111 segments
        </span>
      </Listbox.Action>
    ) : null;

    const lazyLoadingMarkup = lazyLoading ? (
      <Listbox.Loading
        accessibilityLabel={`${
          query ? 'Filtering' : 'Loading'
        } customer segments`}
      />
    ) : null;

    const noResultsMarkup =
      segmentOptions.length === 0 ? (
        <EmptySearchResult
          title=""
          description={`No segments found matching "${query}"`}
        />
      ) : null;

    const listboxMarkup = (
      <Listbox
        enableKeyboardControl
        autoSelection={AutoSelection.FirstSelected}
        accessibilityLabel="Search for and select a customer segment"
        customListId={listboxId}
        onSelect={handleSegmentSelect}
        onActiveOptionChange={handleActiveOptionChange}
      >
        {segmentList}
        {showAllMarkup}
        {noResultsMarkup}
        {lazyLoadingMarkup}
      </Listbox>
    );

    return (
      <LegacyCard>
        <div
          style={{
            alignItems: 'stretch',
            borderTop: '1px solid #DFE3E8',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'stretch',
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {textFieldMarkup}

          <Scrollable
            shadow
            style={{
              position: 'relative',
              height: '262px',
              padding: 'var(--p-space-200) 0',
              borderBottomLeftRadius: 'var(--p-border-radius-200)',
              borderBottomRightRadius: 'var(--p-border-radius-200)',
            }}
            onScrolledToBottom={handleLazyLoadSegments}
          >
            {listboxMarkup}
          </Scrollable>
        </div>
      </LegacyCard>
    );
  },
};

export const WithDisabledTextOption = {
  render() {
    return (
      <LegacyCard>
        <Box paddingBlockStart="200" paddingBlockEnd="200">
          <Listbox accessibilityLabel="Listbox with disabled item example">
            <Listbox.Option value="UniqueValue-1">
              <Listbox.TextOption>Item 1</Listbox.TextOption>
            </Listbox.Option>
            <Listbox.Option value="UniqueValue-2" disabled>
              <Listbox.TextOption disabled>Item 2</Listbox.TextOption>
            </Listbox.Option>
            <Listbox.Option value="UniqueValue-3">
              <Listbox.TextOption>Item 3</Listbox.TextOption>
            </Listbox.Option>
          </Listbox>
        </Box>
      </LegacyCard>
    );
  },
};
