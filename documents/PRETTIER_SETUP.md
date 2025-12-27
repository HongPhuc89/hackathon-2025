# ✅ Prettier Setup - Format on Save

## 📦 Đã cài đặt

### Dependencies
```bash
npm install --save-dev prettier
```

### Files đã tạo

1. **`.prettierrc`** - Prettier configuration
2. **`.prettierignore`** - Files to ignore
3. **`.vscode/settings.json`** - VSCode format on save
4. **`.gitignore`** - Updated to allow .vscode/settings.json

## 🎨 Prettier Configuration

### `.prettierrc`
```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "jsxSingleQuote": false
}
```

### Giải thích:
- **semi: false** - Không dùng semicolon
- **singleQuote: true** - Dùng single quotes
- **trailingComma: es5** - Trailing comma cho ES5
- **tabWidth: 2** - 2 spaces cho indent
- **printWidth: 100** - Max 100 characters per line
- **arrowParens: always** - Always parentheses cho arrow functions

## ⚙️ VSCode Settings

### `.vscode/settings.json`
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

### Features:
- ✅ **Format on Save** - Tự động format khi save
- ✅ **Prettier as default** - Dùng Prettier cho tất cả file types
- ✅ **Trim whitespace** - Xóa trailing whitespace
- ✅ **Insert final newline** - Thêm newline cuối file

## 🚀 Scripts

### package.json
```json
{
  "scripts": {
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,json,md}\""
  }
}
```

### Usage:
```bash
# Format all files
npm run format

# Check if files are formatted
npm run format:check
```

## 📝 Cách sử dụng

### 1. Format on Save (Tự động)
- Mở file bất kỳ (.ts, .tsx, .js, .json, .md)
- Chỉnh sửa code
- **Nhấn Cmd+S (Mac) hoặc Ctrl+S (Windows)**
- Code tự động được format! ✨

### 2. Format manually (Thủ công)
```bash
# Format tất cả files
npm run format

# Hoặc format specific file
npx prettier --write app/auth.tsx
```

### 3. Check formatting
```bash
# Check if code is formatted correctly
npm run format:check
```

## ✅ Files được format

Prettier sẽ format các file types:
- ✅ `.js` - JavaScript
- ✅ `.jsx` - React JSX
- ✅ `.ts` - TypeScript
- ✅ `.tsx` - React TypeScript
- ✅ `.json` - JSON
- ✅ `.md` - Markdown

## 🚫 Files được ignore

`.prettierignore`:
```
node_modules
.expo
.expo-shared
dist
build
coverage
*.log
.DS_Store
```

## 💡 Tips

### 1. Format toàn bộ project lần đầu
```bash
npm run format
```

### 2. Check trước khi commit
```bash
npm run format:check
```

### 3. VSCode Extension
Đảm bảo đã cài extension:
- **Prettier - Code formatter** (esbenp.prettier-vscode)

### 4. Keyboard Shortcuts
- **Format Document**: `Shift+Alt+F` (Windows) hoặc `Shift+Option+F` (Mac)
- **Format Selection**: Select code → `Ctrl+K Ctrl+F`

## 🎯 Lợi ích

1. **Consistency** 🎨
   - Code style nhất quán trong toàn bộ project
   - Không cần tranh luận về style

2. **Productivity** ⚡
   - Không mất thời gian format thủ công
   - Focus vào logic thay vì formatting

3. **Collaboration** 👥
   - Dễ review code
   - Giảm conflicts trong git

4. **Quality** ✨
   - Code sạch, dễ đọc
   - Professional appearance

## 🔧 Troubleshooting

### Prettier không chạy khi save?
1. Check VSCode extension đã cài chưa
2. Check `.prettierrc` file tồn tại
3. Reload VSCode: `Cmd+Shift+P` → "Reload Window"

### Format sai?
1. Check `.prettierrc` config
2. Run `npm run format` để format lại
3. Check `.prettierignore` không ignore file đó

### Conflict với ESLint?
Prettier chỉ lo formatting, không conflict với ESLint rules về code quality.

## ✅ Kết luận

Prettier đã được setup hoàn chỉnh:
- ✅ Format on save enabled
- ✅ Consistent code style
- ✅ Scripts ready to use
- ✅ VSCode integration

**Giờ chỉ cần code và save, Prettier lo phần còn lại!** 🎨✨
