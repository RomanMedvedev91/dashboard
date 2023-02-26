import { AppShell, Group, Header, type AppShellProps } from '@mantine/core';
import { useMounted } from '../hooks/useMounted';
import { ColorSchemeToggle } from './ColorSchemeToggle/ColorSchemeToggle';

export const Layout = ({ children }: AppShellProps) => {
  const { isMounted } = useMounted();

  if (!isMounted) return null;

  return (
    <AppShell
      padding="xl"
      fixed
      header={
        <Header
          height={60}
          p="md"
        >
          <Group position="right" align="center">
          <ColorSchemeToggle />
          </Group>
        </Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        maxWidth: '1400px',
      })}
    >
      {children}
    </AppShell>
  );
};
