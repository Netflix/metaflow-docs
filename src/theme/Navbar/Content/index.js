import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';

import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import styles from './styles.module.css';

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}
function NavbarItems({items}) {
  return (
    <>
      {items.map((item, i) => (
        <NavbarItem {...item} key={i} />
      ))}
    </>
  );
}
function NavbarContentLayout({left, right}) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">
        {right}
      </div>
    </div>
  );
}
export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');

  return (
    <NavbarContentLayout
      left={
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        <>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
            <div
              className={styles.responsivePadding}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <a
                href="https://github.com/Netflix/metaflow"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <img src="/img/github.svg" alt="GitHub" className={`${styles.logo} githubLogo`}/>

              </a>
              <a
                href="http://slack.outerbounds.co/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Slack"
              >
                <img
                  className={styles.logo}
                  src="/img/slack.svg"
                  alt="Slack"
                />
              </a>
            </div>

            {/* Color mode toggle */}
            <NavbarColorModeToggle className={styles.colorModeToggle} />

            {/* Search bar (if no search item in config) */}
            {!searchBarItem && (
              <NavbarSearch>
                <SearchBar />
              </NavbarSearch>
            )}

          </div>

        </>
        
      }
    />
  );
}
