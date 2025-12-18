'use client';

import { useState } from 'react';

import { Alert } from '@/components/retroui/alert';
import { Badge } from '@/components/retroui/badge';
import { Button } from '@/components/retroui/button';
import { Input } from '@/components/retroui/input';
import { Loader } from '@/components/retroui/loader';
import { Table } from '@/components/retroui/table';
import { Text } from '@/components/retroui/text';
import { useApiV2LocationList } from '@/services/generated/location';

const LOCATIONS_PER_PAGE = 20;

/**
 * Locations list page component
 * Displays a searchable list of locations with pagination
 */
const LocationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);

  const { data, isError, isLoading } = useApiV2LocationList({
    limit: LOCATIONS_PER_PAGE,
    offset,
  });

  const locationsList = data?.data?.results || [];
  const totalCount = data?.data?.count || 0;
  const hasNext = !!data?.data?.next;
  const hasPrevious = !!data?.data?.previous;

  const totalPages = Math.ceil(totalCount / LOCATIONS_PER_PAGE);
  const currentPage = Math.floor(offset / LOCATIONS_PER_PAGE) + 1;

  /**
   * Filters locations by search query
   */
  const filteredLocations = locationsList.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  /**
   * Extracts Location ID from URL
   */
  const getLocationId = (url: string): string => {
    const matches = url.match(/\/(\d+)\//);
    return matches ? matches[1] : '';
  };

  /**
   * Handles search input change
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setOffset(0); // Reset to first page on search
  };

  /**
   * Handles next page
   */
  const handleNextPage = () => {
    if (hasNext) {
      setOffset((prev) => prev + LOCATIONS_PER_PAGE);
    }
  };

  /**
   * Handles previous page
   */
  const handlePreviousPage = () => {
    if (hasPrevious) {
      setOffset((prev) => Math.max(0, prev - LOCATIONS_PER_PAGE));
    }
  };

  if (isError) {
    return (
      <div className='container mx-auto p-8'>
        <Alert status='error'>
          <Alert.Title>Ошибка загрузки</Alert.Title>
          <Alert.Description>
            Не удалось загрузить список локаций. Попробуйте обновить страницу.
          </Alert.Description>
        </Alert>
      </div>
    );
  }

  return (
    <div className='container mx-auto min-h-screen p-8'>
      <div className='mb-6'>
        <Text as='h1' className='mb-4 text-3xl'>
          Локации
        </Text>
        <div className='max-w-md'>
          <Input
            onChange={handleSearchChange}
            placeholder='Поиск локаций...'
            type='text'
            value={searchQuery}
          />
        </div>
      </div>

      {isLoading ? (
        <div className='flex min-h-[400px] items-center justify-center'>
          <Loader size='lg' />
        </div>
      ) : (
        <>
          {filteredLocations.length === 0 ? (
            <Alert status='info'>
              <Alert.Title>Локации не найдены</Alert.Title>
              <Alert.Description>Попробуйте изменить поисковый запрос.</Alert.Description>
            </Alert>
          ) : (
            <>
              <div className='mb-4'>
                <Text as='p' className='text-muted-foreground'>
                  Найдено локаций: {filteredLocations.length}
                  {searchQuery && ` по запросу "${searchQuery}"`}
                </Text>
              </div>

              <div className='mb-6 overflow-x-auto'>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.Head>ID</Table.Head>
                      <Table.Head>Название</Table.Head>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {filteredLocations.map((location) => {
                      const locationId = getLocationId(location.url);
                      return (
                        <Table.Row key={location.name}>
                          <Table.Cell>
                            <Badge variant='outline'>#{locationId.padStart(3, '0')}</Badge>
                          </Table.Cell>
                          <Table.Cell className='font-semibold capitalize'>
                            {location.name.replaceAll('-', ' ')}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </div>

              {/* Pagination */}
              {!searchQuery && (hasNext || hasPrevious) && (
                <div className='flex items-center justify-center gap-4'>
                  <Button disabled={!hasPrevious} onClick={handlePreviousPage} variant='outline'>
                    Назад
                  </Button>
                  <Text as='p' className='text-muted-foreground'>
                    Страница {currentPage} из {totalPages}
                  </Text>
                  <Button disabled={!hasNext} onClick={handleNextPage} variant='outline'>
                    Вперед
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LocationsPage;
