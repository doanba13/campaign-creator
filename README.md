# Project overview

## Breakdown and building UI

As the requirement allowed, i am using Material UI for building UI. First, i will break this Advertisement campaign page into two component `CampaignInfo` and `SubCampaign`. The `CampaignInfo` will be the first tab and handle campaign information. The second tab will be `SubCampaign` component, it handle campaign's sub-campaign information.

![Component hierarchy](/assets/1.png "Component hierarchy")

I was kind of familiar with UI components frameworks, but i really not deep dive enough into MUI, so i think my UI still kind of boilderplate and not Accessibility friendly.

## State management

`useState` is fundamental API to create state in React, but heavily using it can cause props drill or components tight with each other when you need to share components state. For easy to share and consume state in this project scenario, i will using a **global store** for manage state.

There are some options for me like using `ReactContext`, `redux` or `zustand`. Because i will contains input state in the state so it is frequently updated, React Context may not be as effective or efficient as `redux` or `zustand`. But as requirement, i will using `ReactContext` for store, provide data and combine `useReducer` to make state reactive.

In future, i will separate current context into multiple contexts as much as possible and keep state close to its component consumer for better optimization.

![Using ReactContext for global state](/assets/2.png "Using ReactContext for global state")

## Validate

When create state data, i extends `Campaign` object and it child to add extra empty `error` property. When `submit` event dispatched, action `VALIDATE` send to reducer and if any object in state have invalid value, property error will filled. Any consumer of this `error` property will react to it state and and an error notification popup.

If nothing happen, the state was clean, `DataDisplayDialog` will show it content that extract from state.

![Final component hierarchy](/assets/3.png "Final component hierarchy")

## Testing

Since all reducer's method was pure-function, so expecting it result with test will be easy. I implement some test case for `campaign-reducer` using `jest`. All test are inside `__tests__`folder. It's better for config github action for some check when committing code.

Because i start this project kinda late, it's all about me. I don't write any test for `React` pieces. I will update later.

Thank you for reading this far, I look forward to receiving frank criticism from experienced developers.

Have a good day and happy coding ❤️
