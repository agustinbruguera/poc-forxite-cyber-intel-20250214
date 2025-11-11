import type { ThemeConfig } from 'antd';

export const forxitePalette = {
  primary: '#5120ff',
  secondary: '#0b1237',
  surface: '#f5f6fb',
  success: '#2bc48a',
  warning: '#ffc14d',
  danger: '#ff6b6b',
};

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: forxitePalette.primary,
    colorInfo: forxitePalette.primary,
    colorSuccess: forxitePalette.success,
    colorWarning: forxitePalette.warning,
    colorError: forxitePalette.danger,
    borderRadius: 10,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    wireframe: false,
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      siderBg: '#0b1237',
      bodyBg: forxitePalette.surface,
    },
    Menu: {
      itemSelectedColor: '#ffffff',
      itemHoverColor: '#ffffff',
      itemSelectedBg: '#5120ff',
    },
    Button: {
      controlHeight: 38,
      borderRadius: 10,
    },
    Card: {
      borderRadiusLG: 12,
    },
  },
};
