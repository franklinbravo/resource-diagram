import { useCallback, useRef, useState } from 'react';
import './App.css';
import {
	Controls,
	ReactFlow,
	ReactFlowProvider,
	addEdge,
	useEdgesState,
	useNodesState,
} from 'reactflow';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactflow/dist/style.css';
import Panel from './components/Panel';
import ElementNode from './components/CustomNodes/ElementNode';
import ElementItemNode from './components/CustomNodes/ElementItemNode';
import PageNode from './components/CustomNodes/PageNode';
import dataPanel from './utils/dataPanel';

const nodeTypes = {
	element: ElementNode,
	'element-item': ElementItemNode,
	page: PageNode,
};

function App() {
	const reactFlowWrapper = useRef(null);
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [reactFlowInstance, setReactFlowInstance] = useState(null);
	const [items, setItems] = useState(dataPanel);
	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[setEdges],
	);

	const onDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	const onDrop = useCallback(
		(event) => {
			event.preventDefault();

			const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
			const id = event.dataTransfer.getData('application/reactflow');

			const { title, type } = items.find((d) => String(d.id) === String(id));
			// check if the dropped element is valid
			if (typeof title === 'undefined' || !title) {
				return;
			}

			const position = reactFlowInstance.project({
				x: event.clientX - reactFlowBounds.left,
				y: event.clientY - reactFlowBounds.top,
			});
			const newNode = {
				id: id,
				position,
				type,
				data: { label: title },
			};

			setNodes((nds) => nds.concat(newNode));
		},
		[reactFlowInstance, setNodes, items],
	);
	return (
		<div className="app row">
			<ReactFlowProvider>
				<div className="col-4">
					<Panel setItems={setItems} items={items} />
				</div>
				<div className="col-8">
					<div className="reactflow-wrapper" ref={reactFlowWrapper}>
						<ReactFlow
							nodes={nodes}
							edges={edges}
							onNodesChange={onNodesChange}
							onEdgesChange={onEdgesChange}
							onConnect={onConnect}
							onInit={setReactFlowInstance}
							onDrop={onDrop}
							onDragOver={onDragOver}
							nodeTypes={nodeTypes}
							fitView
						>
							<Controls />
						</ReactFlow>
					</div>
					{/* <Sidebar /> */}
				</div>
			</ReactFlowProvider>
		</div>
	);
}

export default App;
