/*!
 * Copyright (c) 2019-2020 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the MIT License which is
 * available at https://opensource.org/licenses/MIT.
 *
 * SPDX-License-Identifier: EPL-2.0 OR MIT
 */
import { TreeEditor } from '@eclipse-emfcloud/theia-tree-editor';
import { LabelProviderContribution } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { injectable } from 'inversify';

import { CoffeeModel } from './coffee-model';
import { CoffeeTreeEditorConstants } from './coffee-tree-editor-widget';

const DEFAULT_COLOR = 'black';

const ICON_CLASSES: Map<string, string> = new Map([
    [CoffeeModel.Type.AutomaticTask, 'fa-cog ' + DEFAULT_COLOR],
    [CoffeeModel.Type.BrewingUnit, 'fa-fire ' + DEFAULT_COLOR],
    [CoffeeModel.Type.ControlUnit, 'fa-server ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Decision, 'fa-chevron-up ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Dimension, 'fa-arrows-alt ' + DEFAULT_COLOR],
    [CoffeeModel.Type.DipTray, 'fa-inbox ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Display, 'fa-tv ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Flow, 'fa-exchange-alt ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Fork, 'fa-code-branch fa-rotate-90 ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Join, 'fa-code-branch fa-rotate-270 ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Machine, 'fa-cogs ' + DEFAULT_COLOR],
    [CoffeeModel.Type.ManualTask, 'fa-wrench ' + DEFAULT_COLOR],
    [CoffeeModel.Type.GrabTask, 'fa-hand-rock-o ' + DEFAULT_COLOR],
    [CoffeeModel.Type.ReleaseTask, 'fa-hand-spock-o ' + DEFAULT_COLOR],
    [CoffeeModel.Type.RotateTask, 'fa-repeat ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Merge, 'fa-chevron-down ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Node, 'fa-circle ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Processor, 'fa-microchip ' + DEFAULT_COLOR],
    [CoffeeModel.Type.RAM, 'fa-memory ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Task, 'fa-tasks ' + DEFAULT_COLOR],
    [CoffeeModel.Type.WaterTank, 'fa-tint ' + DEFAULT_COLOR],
    [CoffeeModel.Type.WeightedFlow, 'fa-exchange-alt light-orange'],
    [CoffeeModel.Type.Workflow, 'fa-random ' + DEFAULT_COLOR]
]);

/* Icon for unknown types */
const UNKNOWN_ICON = 'fa-question-circle ' + DEFAULT_COLOR;

@injectable()
export class CoffeeTreeLabelProvider implements LabelProviderContribution {

    public canHandle(element: object): number {
        if ((TreeEditor.Node.is(element) || TreeEditor.CommandIconInfo.is(element))
            && element.editorId === CoffeeTreeEditorConstants.EDITOR_ID) {
            return 1000;
        }
        return 0;
    }

    public getIcon(element: object): string | undefined {
        let iconClass: string;
        if (TreeEditor.CommandIconInfo.is(element)) {
            iconClass = ICON_CLASSES.get(element.type);
        } else if (TreeEditor.Node.is(element)) {
            iconClass = ICON_CLASSES.get(element.jsonforms.type);
            if (!iconClass && element.jsonforms.property === 'flows') {
                iconClass = ICON_CLASSES.get(CoffeeModel.Type.Flow);
            }
        }

        return iconClass ? 'fa ' + iconClass : 'far ' + UNKNOWN_ICON;
    }

    public getName(element: object): string | undefined {
        const data = TreeEditor.Node.is(element) ? element.jsonforms.data : element;
        if (data.eClass) {
            switch (data.eClass) {
                case CoffeeModel.Type.Task:
                case CoffeeModel.Type.AutomaticTask:
                case CoffeeModel.Type.ManualTask:
                case CoffeeModel.Type.GrabTask:
                case CoffeeModel.Type.ReleaseTask:
                case CoffeeModel.Type.RotateTask:
                case CoffeeModel.Type.Machine:
                    return data.name || this.getTypeName(data.eClass);
                default:
                    // TODO query title of schema
                    return this.getTypeName(data.eClass);
            }
        }
        // guess
        if (data.nodes) {
            return data.name || 'Workflow';
        }
        // ugly guess, fix in modelserver
        if (data.source && data.target) {
            return 'Flow';
        }
        return undefined;
    }
    private getTypeName(eClass: string): string {
        const fragment = new URI(eClass).fragment;
        if (fragment.startsWith('//')) {
            return fragment.substring(2);
        }
        return fragment;
    }
}
