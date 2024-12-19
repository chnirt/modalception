# Modalception

A React Native component that enables nested modals, perfect for creating multi-level modal flows. You can easily control modal visibility and content at each level.

## Installation

To use Modalception in your project, first install the necessary dependencies:

```bash
npm install Modalception
```

or

```bash
yarn add Modalception
```

## Usage

### 1. Import the component

```tsx
import Modalception from './Modalception'; // Adjust the import path based on where the component is located
```

### 2. Create your modal content

Define the custom content you want to show in each modal. For example:

```tsx
const customContent1 = (
  <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
    <Text style={{fontSize: 24, fontWeight: 'bold'}}>This is Modal 1</Text>
    <Button
      title="Open Modal 2"
      onPress={() => {
        modalRef.current?.show(customContent2);
      }}
    />
  </SafeAreaView>
);
```

### 3. Initialize <code>Modalception</code> in your component

Set up the modal in your app, passing the <code>ref</code> and optionally controlling the modal level and content.

```tsx
import React, {useRef} from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import Modalception from './Modalception';

const App = () => {
  const modalRef = useRef(null);

  const customContent2 = (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Text style={{fontSize: 24, fontWeight: 'bold'}}>This is Modal 2</Text>
      <Button
        title="Open Modal 3"
        onPress={() => {
          modalRef.current?.show(customContent3);
        }}
      />
    </SafeAreaView>
  );

  const customContent3 = (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Text style={{fontSize: 24, fontWeight: 'bold'}}>This is Modal 3</Text>
      <Button
        title="Close Modal 3"
        onPress={() => {
          modalRef.current?.hide();
        }}
      />
    </SafeAreaView>
  );

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="Open Modal 1"
        onPress={() => {
          modalRef.current?.show(customContent1);
        }}
      />
      <Modalception ref={modalRef} />
    </SafeAreaView>
  );
};

export default App;
```

### 4. Control modal visibility

You can control the visibility of each modal by using the <code>show</code> and <codde>hide</code> methods.

- show: To open the modal and display custom content.
- hide: To close the modal.

```tsx
modalRef.current?.show(customContent); // Opens modal with custom content
modalRef.current?.hide(); // Closes the modal
```

### 5. Customization

You can customize the component by adjusting the <code>maxLevel</code> and <code>level</code> props. <code>maxLevel</code> limits how deep the modal can be nested, while <code>level</code> determines the current modal level.

```tsx
<Modalception ref={modalRef} level={1} maxLevel={3} />
```

## License

MIT License

---

How does this look? Feel free to tweak it further as per your needs!
