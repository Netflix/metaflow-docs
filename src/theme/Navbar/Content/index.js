import React from 'react';
import {useThemeConfig, useColorMode} from '@docusaurus/theme-common';

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

// Import the images
import slackLogo from '/img/slack.svg';
import githubLogo from '/img/github.svg';

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

  const {colorMode, setColorMode} = useColorMode();
  console.log(colorMode);

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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ paddingRight: '20px', display: 'flex', alignItems: 'center', opacity: 0.75 }}> 
            
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <a href="https://github.com/Netflix/metaflow" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <img 
                  src={colorMode === 'dark' ? '/img/github-dark.svg' : '/img/github.svg'} 
                  alt="GitHub" 
                  style={{ height: '20px', width: '20px', margin: '0 12px' }} 
                />
              </a>
              <div style={{ borderRight: '1px solid #ccc', height: '20px' }} />
              <a href="http://slack.outerbounds.co/" target="_blank" rel="noopener noreferrer" aria-label="Slack">
                <img src="/img/slack.svg" alt="Slack" style={{ height: '20px', width: '20px', margin: '0 12px' }} />
              </a>
              </div>
          </div>

          <NavbarColorModeToggle className={styles.colorModeToggle} />
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
