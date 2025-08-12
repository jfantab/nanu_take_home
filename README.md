# nanu_take_home


## Approach

For the nested checkbox tree, the input JSON file needed to be edited into a tree structure where each node can access its own children. An example of one node is shown below.

```
{
    name: label,
    children: [],
    checked: true,
};
```

The nested checkbox tree is rendered recursively. The `checked` and `expanded` states act as dictionaries which contain the checkbox checked or collapsed/expanded states for each setting name. These states are passed down as props to the nested checkbox tree nodes.

In order to update a node's descendants and its parents, I used DFS to traverse down one node's children with a top-down approach. For the second requirement where a child's checked states affects its parents states, I used a bottom-up approach. I needed to reach the leaves of the tree first to then decide the checked state of each parent. In the top-down approach, each node doesn't know or cannot directly influence its parent's state.

I used Firebase Firestore for its NoSQL database. The schema of the settings and logs are subject to change and thus is unfit for a relational database. 

## Performance

The main bottlenecks in the app performance stem from the nested checkbox tree of arbitrary depth. The time complexity of recursively traversing the tree is `O(b^d)`, where `b` is the number of branches and `d` is the depth of the tree. However, using DFS, the time complexity reduces to `O(h)` with the usage of a stack, where `h` represents the max depth of the tree. BFS (with a queue) has a time complexity of `O(n)` where n represents the number of nodes. With a sufficiently large tree, recursion can cause a major slowdown for the app.

The initial read of all the calendar logs from the DB does take some time but only needs to happen once.

## Improvements

The calendar logs can be retrieved on a day-to-day basis instead of for the whole month at once. In addition, another feature that can be added is the editing or writing of logs via a text input box.

One improvement is to store them in the cloud so that the settings can be saved. Likewise, the app needs to be able to read the settings from the database in the cloud too. One idea I have of storing the nested tree in Firebase Firestore is in a flat tree structure, where each setting takes the following format, akin to an adjacency list: 

```
{
    "name": "advanced",
    "children": ["workflows", "automation"],
    "checked": false
}
```

Another idea I had was to store the document references instead of just the children names. This would allow direct access rather than having to search linearly through all the documents to find each child.

Finally, it is important to consider the scalability, availability, and performance of the app. Balancing bandwidth, compute power, and cost is a key tradeoff——higher processing capacity and greater bandwidth can improve performance but will increase the costs. As the user base grows, the cloud backend must be capable of handling an increasing volume of requests while maintaining low latency. The app should deliver fast, responsive interactions to deliver a positive user experience.
