/********************************************************************************
 * Copyright (c) 2019-2021 EclipseSource, Christian W. Damus, and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the MIT License which is
 * available at https://opensource.org/licenses/MIT.
 *
 * SPDX-License-Identifier: EPL-2.0 OR MIT
 ********************************************************************************/
import {
    angleOfPoint,
    CircularNodeView,
    IView,
    Point,
    PolylineEdgeView,
    RectangularNodeView,
    RenderingContext,
    SEdge,
    SShapeElement,
    toDegrees
} from '@eclipse-glsp/client';
import { injectable } from 'inversify';
import * as snabbdom from 'snabbdom-jsx';
import { VNode } from 'snabbdom/vnode';

import { ActivityNode, Icon, TaskNode, WeightedEdge } from './model';

const JSX = { createElement: snabbdom.svg };

@injectable()
export class TaskNodeView extends RectangularNodeView {
    render(node: TaskNode, context: RenderingContext): VNode {
        const rcr = this.getRoundedCornerRadius(node);
        const graph = <g>
            <rect class-sprotty-node={true} class-task={true}
                class-automated={node.taskType === 'automated'}
                class-manual={node.taskType === 'manual'}
                class-mouseover={node.hoverFeedback} class-selected={node.selected}
                x={0} y={0} rx={rcr} ry={rcr}
                width={Math.max(0, node.bounds.width)} height={Math.max(0, node.bounds.height)}></rect>
            {context.renderChildren(node)}
        </g>;
        return graph;
    }

    protected getRoundedCornerRadius(node: SShapeElement): number {
        return 5;
    }
}

@injectable()
export class GrabNodeView extends CircularNodeView {
    render(node: TaskNode, context: RenderingContext): VNode {
        const radius = this.getRadius(node);
        const graph = <g>
            <circle class-sprotty-node={true} class-task={true} class-grab={true} class-mouseover={node.hoverFeedback} class-selected={node.selected}
                r={radius} cx={radius} cy={radius}></circle>
            {context.renderChildren(node)}
        </g>;
        return graph;
    }

    protected getRadius(node: SShapeElement): number {
        const d = Math.min(node.size.width, node.size.height);
        return d > 0 ? d / 2 : 0;
    }
}

@injectable()
export class ReleaseNodeView implements IView {
    render(node: TaskNode, context: RenderingContext): VNode {
        const graph = <g>
            <path class-sprotty-node={true} class-task={true} class-release={true} class-mouseover={node.hoverFeedback} class-selected={node.selected}
                d="m 24.740535,2.61345 c 1.708149,0 2.498978,1.6517 2.511784,3.12595 l 0.785341,16.802379 c -0.02823,1.05008 0.757116,1.61851 1.503517,1.61851 0.580447,0 1.137373,-0.34367 1.269875,-1.07204 0.236517,-1.30097 2.59045,-10.953219 3.034997,-13.2750095 0.204633,-1.06864 0.799193,-3.0279395 3.026636,-3.0276795 0.133809,0 0.273367,0.007 0.419197,0.0217 2.018628,0.20411 2.235282,2.6084795 2.018628,3.9369 -0.777763,4.769809 -2.656309,13.429989 -2.841864,14.432249 -0.134854,0.72758 0.722618,1.19094 1.425113,1.19094 0.358565,0 0.676622,-0.12074 0.802068,-0.38861 0.354906,-0.75738 2.386078,-4.8409 3.843859,-7.47421 0.700405,-1.26543 1.545855,-1.96818 2.568758,-1.96818 0.29924,0 0.613899,0.0601 0.944239,0.18424 1.400285,0.52505 1.560228,2.71067 1.105488,3.85327 l -9.058733,26.81607 c -0.172227,0.50963 -0.650226,0.85251 -1.187813,0.85251 -5.22e-4,0 -10e-4,0 -0.0016,0 l -17.721793,-0.0212 c -0.654146,-7.8e-4 -1.275624,-0.28591 -1.702662,-0.78142 L 3.0384613,30.68267 c -0.638988,-0.75607 -0.544643,-1.88743 0.211689,-2.52668 0,0 0.906606,-0.758691 2.268996,-0.758421 0.292184,0 0.605536,0.035 0.935353,0.11969 1.934474,0.497601 5.5250897,4.007461 6.9904507,5.196321 0.286173,0.23234 0.646828,0.33531 1.018461,0.33531 1.088762,0 2.2737,-0.88413 1.967142,-1.99406 C 16.016322,29.55366 10.698216,17.637379 8.2692773,12.31849 7.8926793,11.49369 7.2657143,8.6366695 9.5221643,7.6877195 9.9152273,7.52229 10.273008,7.45094 10.598643,7.45094 c 1.766953,0 2.583655,2.1103595 2.926278,2.80423 0,0 5.039774,11.150799 6.262868,13.300629 0.259516,0.48375 0.629841,0.69099 0.982657,0.69099 0.559539,0 1.07465,-0.5219 1.030221,-1.28921 -0.08311,-1.43374 -0.182419,-12.418579 -0.06481,-17.235949 0.03789,-1.53514 0.978737,-3.07943 2.967048,-3.10766 0.01228,-2.6e-4 0.02509,-5.2e-4 0.03763,-5.2e-4 m 0,-2.61345 c 0,0 0,0 0,0 l -0.07475,5.3e-4 c -3.132479,0.0447 -5.463413,2.42345 -5.542862,5.65654 -0.06168,2.5282495 -0.06508,6.76309 -0.04103,10.449619 -1.225708,-2.637239 -2.493491,-5.418989 -3.175601,-6.9279895 -0.01228,-0.0272 -0.02509,-0.0541 -0.03842,-0.081 -0.02404,-0.0486 -0.05096,-0.10637 -0.08102,-0.17092 C 15.31225,7.9153695 13.867797,4.83778 10.598634,4.83752 c -0.6902107,0 -1.3932287,0.14844 -2.0897127,0.44115 -1.331812,0.56006 -2.309242,1.55604 -2.825921,2.8800195 -0.795533,2.0377005 -0.24305,4.2560005 0.208815,5.2454505 2.089974,4.575889 5.0293187,11.176929 6.7160377,15.12768 -2.045284,-1.747611 -3.8893327,-3.130651 -5.5028747,-3.545661 -0.521383,-0.13407 -1.055049,-0.20202 -1.586364,-0.20202 -2.200262,0 -3.673201,1.1392 -3.946307,1.36762 -0.90895702,0.76809 -1.45830402,1.832551 -1.55656902,3.005981 -0.09827,1.17266 0.266049,2.31343 1.02577802,3.21219 0.0055,0.007 0.01098,0.0131 0.01673,0.0196 L 15.505388,49.146699 c 0.92307,1.07126 2.26403,1.68672 3.678951,1.68829 l 17.721793,0.0212 c 1.664767,0 3.136922,-1.05662 3.668498,-2.62939 l 9.0407,-26.76197 c 0.554574,-1.46014 0.507009,-3.31203 -0.126491,-4.74315 -0.514326,-1.1622 -1.409171,-2.03143 -2.519364,-2.44776 -0.620171,-0.232589 -1.246615,-0.350459 -1.86182,-0.350459 -1.164813,0 -2.745949,0.411099 -4.123759,2.193989 0.348895,-1.7876 0.673485,-3.533379 0.905037,-4.952479 0.118389,-0.72628 0.390972,-3.2459105 -1.077264,-5.16052 -0.798147,-1.04094 -1.924804,-1.66241 -3.257663,-1.79727 -0.230245,-0.0233 -0.459706,-0.035 -0.68211,-0.035 -2.884725,0 -4.975745,1.92507 -5.593303,5.1495395 C 31.124399,10.12745 30.716179,11.91348 30.24994,13.91355 L 29.864195,5.66185 C 29.812715,2.43032 27.617936,7e-5 24.74053,7e-5 l 0,0 z"/>
            {context.renderChildren(node)}
        </g>;
        return graph;
    }
}

@injectable()
export class RotateNodeView implements IView {
    render(node: TaskNode, context: RenderingContext): VNode {
        let graph;

        if (!node.degrees || node.degrees! >= 0) {
            graph = <g>
                <path class-sprotty-node={true} class-task={true} class-rotate-right={true} class-rotate-left={false} class-mouseover={node.hoverFeedback} class-selected={node.selected}
                    d="m 7.8454645,7.8451726 c 10.4445375,-10.44467 27.3686045,-10.46001 37.8329045,-0.0472 l 4.30803,-4.30816 0.0136,15.9726404 -15.972635,-0.0137 4.074625,-4.07449 c -6.280325,-6.2285704 -16.420072,-6.2132304 -22.680371,0.0472 -6.2765525,6.27642 -6.2765525,16.45258 0,22.72887 3.138277,3.13815 7.251258,4.70722 11.36437,4.70722 v 10.71452 c -6.855316,0 -13.710243,-2.61517 -18.9407035,-7.8455 -10.460401,-10.46066 -10.460401,-27.42074 1.3e-4,-37.8814004 z"/>
                {context.renderChildren(node)}
            </g>;
        } else {
            graph = <g>
                <path class-sprotty-node={true} class-task={true} class-rotate-right={false} class-rotate-left={true} class-mouseover={node.hoverFeedback} class-selected={node.selected}
                    d="m 42.154587,7.8451726 c -10.444542,-10.44467 -27.368608,-10.46001 -37.83291,-0.0472 L 0.01365,3.4898126 0,19.462453 l 15.972636,-0.0137 -4.074623,-4.07449 c 6.280324,-6.2285704 16.420071,-6.2132304 22.680369,0.0472 6.276545,6.27642 6.276545,16.45258 0,22.72887 -3.138276,3.13815 -7.251258,4.70722 -11.36437,4.70722 v 10.71452 c 6.855317,0 13.710245,-2.61517 18.940705,-7.8455 10.4604,-10.46066 10.4604,-27.42074 -1.3e-4,-37.8814004 z"/>
                {context.renderChildren(node)}
            </g>;
        }
        return graph;
    }
}

@injectable()
export class ForkOrJoinNodeView extends RectangularNodeView {
    render(node: ActivityNode, context: RenderingContext): VNode {
        const graph = <g>
            <rect class-sprotty-node={true} class-forkOrJoin={true}
                class-mouseover={node.hoverFeedback} class-selected={node.selected}
                width={10} height={Math.max(50, node.bounds.height)}></rect>
        </g>;
        return graph;
    }
}

@injectable()
export class WorkflowEdgeView extends PolylineEdgeView {
    protected renderAdditionals(edge: SEdge, segments: Point[], context: RenderingContext): VNode[] {
        const p1 = segments[segments.length - 2];
        const p2 = segments[segments.length - 1];
        return [
            <path key={edge.id} class-sprotty-edge={true} class-arrow={true} d="M 1.5,0 L 10,-4 L 10,4 Z"
                transform={`rotate(${toDegrees(angleOfPoint({ x: p1.x - p2.x, y: p1.y - p2.y }))} ${p2.x} ${p2.y}) translate(${p2.x} ${p2.y})`} />
        ];
    }
}

@injectable()
export class WeightedEdgeView extends WorkflowEdgeView {
    render(edge: Readonly<WeightedEdge>, context: RenderingContext): VNode {
        const router = this.edgeRouterRegistry.get(edge.routerKind);
        const route = router.route(edge);
        if (route.length === 0) {
            return this.renderDanglingEdge('Cannot compute route', edge, context);
        }

        return <g class-sprotty-edge={true}
            class-weighted={true}
            class-low={edge.probability === 'low'}
            class-medium={edge.probability === 'medium'}
            class-high={edge.probability === 'high'}
            class-mouseover={edge.hoverFeedback}>
            {this.renderLine(edge, route, context)}
            {this.renderAdditionals(edge, route, context)}
            {context.renderChildren(edge, { route })}
        </g>;
    }
}

@injectable()
export class IconView implements IView {
    render(element: Icon, context: RenderingContext): VNode {
        const radius = this.getRadius();
        return <g>
            <circle class-sprotty-icon={true} r={radius} cx={radius} cy={radius}></circle>
            {context.renderChildren(element)}
        </g>;
    }

    getRadius() {
        return 16;
    }
}
