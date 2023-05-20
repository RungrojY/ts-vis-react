import { useEffect, useRef, useState } from 'react';
import { DataSet, Network, Node, Edge } from 'vis-network/standalone/esm/vis-network';

type NodeData = Node & {
  id: number;
  label: string;
  color?: string;
  data?: any;
};

type EdgeData = Edge & {
  from: number;
  to: number;
  arrows?: 'to' | 'middle' | 'from' | 'fromto' | boolean;
};

const NetworkGraph = () => {
  const networkRef = useRef<HTMLDivElement | null>(null);
  const [network, setNetwork] = useState<Network | null>(null);

  useEffect(() => {
    // Create the dataset and network options
    const nodes = new DataSet<NodeData>([
      { id: 1, label: 'Ginger', color: 'lime', data: 'Data for Ginger node' },
      { id: 2, label: 'Gingerol', color: 'lime', data: 'Data for Gingerol node' },
      { id: 3, label: 'Curcumin', color: 'lightblue', data: 'Data for Curcumin node' },
      { id: 4, label: 'Andrographis', color: 'lightblue', data: 'Data for Andrographis node' },
      { id: 5, label: 'Andrographolide', color: 'lightblue', data: 'Data for Andrographolide node' },
    ]);

    const handleClick = (nodeId: number) => {
      console.log(network)
      const clickedNode = nodes.get(nodeId);

      if (clickedNode) {
        alert(clickedNode.data);
      }
    }

    const edges = new DataSet<EdgeData>([
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 4, to: 5 },
    ]);

    const data = { nodes, edges };
    const options = {
      nodes: {
        color: {
          background: 'lightgray',
        },
      },
      edges: {
        arrows: {
          to: { enabled: true, scaleFactor: 1 },
        },
      },
    };

    // Create the network instance
    const container = networkRef.current;
    const newNetwork = new Network(container!, data, options);
    setNetwork(newNetwork);

    // Handle click events on nodes
    newNetwork.on('click', (event) => {
      if (event.nodes.length === 1) {
        const nodeId = event.nodes[0];
        handleClick(nodeId);
      }
    });

    // Clean up when the component unmounts
    return () => {
      newNetwork.destroy();
    };
  }, []);

  return <div ref={networkRef} style={{ width: '100%', height: '400px' }} />;
};

export default NetworkGraph;