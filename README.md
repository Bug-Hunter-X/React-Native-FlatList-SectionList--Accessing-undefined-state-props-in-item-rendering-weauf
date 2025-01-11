# React Native FlatList/SectionList: Undefined State/Props in Item Rendering

This repository demonstrates a common yet subtle bug in React Native when using FlatList or SectionList components.  The issue stems from attempting to access component state or props before they've had a chance to fully mount or update within the renderItem function.

## The Bug

The primary problem is that asynchronous data fetching or other delays can cause the component's state or props to be undefined when the renderItem function first tries to access them.  This leads to errors or unexpected UI behavior.

## The Solution

The solution involves carefully handling potential undefined values using optional chaining (?.) and nullish coalescing (??).  Additionally, ensuring proper loading states and error handling within the FlatList/SectionList is crucial.