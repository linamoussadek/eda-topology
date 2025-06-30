import AnnotationNode from '../../../components/nodes/AnnotationNode';
import ToolbarNode from '../../../components/nodes/ToolbarNode';
import ResizerNode from '../../../components/nodes/ResizerNode';
import CircleNode from '../../../components/nodes/CircleNode';
import TextInputNode from '../../../components/nodes/TextInputNode';
import CustomNode from '../../../components/nodes/CustomNode';
import ButtonEdge from '../../../components/edges/ButtonEdge';

export const nodeTypes = {
  annotation: AnnotationNode,
  tools: ToolbarNode,
  resizer: ResizerNode,
  circle: CircleNode,
  textinput: TextInputNode,
  custom: CustomNode,
};

export const edgeTypes = {
  button: ButtonEdge,
}; 