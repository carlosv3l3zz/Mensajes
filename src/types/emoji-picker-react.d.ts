declare module 'emoji-picker-react' {
  import { ComponentType } from 'react';

  export interface EmojiClickData {
    emoji: string;
    unified: string;
    unifiedWithoutSkinTone: string;
    originalUnified: string;
    names: string[];
    activeSkinTone: string;
    imageUrl?: string;
    getImageUrl: (emojiStyle?: EmojiStyle) => string;
    isCustom: boolean;
    [key: string]: any;
  }

  export interface EmojiStyle {
    emojiStyle?: 'apple' | 'google' | 'facebook' | 'twitter' | 'native';
  }

  export interface PreviewConfig {
    showPreview?: boolean;
    defaultEmoji?: string;
    defaultCaption?: string;
  }

  export interface EmojiPickerProps {
    onEmojiClick?: (emojiData: EmojiClickData, event: MouseEvent) => void;
    autoFocusSearch?: boolean;
    theme?: 'light' | 'dark' | 'auto';
    emojiStyle?: 'apple' | 'google' | 'facebook' | 'twitter' | 'native';
    defaultSkinTone?: string;
    skinTonePickerLocation?: 'SEARCH' | 'PREVIEW';
    height?: number | string;
    width?: number | string;
    searchPlaceHolder?: string;
    searchPlaceholder?: string;
    searchDisabled?: boolean;
    skinTonesDisabled?: boolean;
    previewConfig?: PreviewConfig;
    lazyLoadEmojis?: boolean;
    suggestedEmojisMode?: 'frequent' | 'recent';
    categories?: string[];
    categoryOrder?: string[];
    customEmojis?: any[];
    className?: string;
    style?: React.CSSProperties;
    [key: string]: any;
  }

  const EmojiPicker: ComponentType<EmojiPickerProps>;
  export default EmojiPicker;
}
