import { Component } from '@angular/core';
import { ITreeOptions, TreeNode} from 'angular-tree-component';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-async',
  template: `
    <tree-root #tree [options]="options" [nodes]="nodes"></tree-root>
 `,
  styles: []
})
export class AsyncTreeComponent {
  options: ITreeOptions = {
    // getChildren: this.getChildren.bind(this),
    getChildren$: node => {
      const newNodes = this.asyncChildren.map((c) => Object.assign({}, c));
      return of(newNodes);
    },
    useCheckbox: true
  };

  nodes: any[] = [];

  asyncChildren = [
    {
      name: 'child1',
      hasChildren: true
    }, {
      name: 'child2'
    }
  ];

  constructor() {
    this.nodes = [
      {
        name: 'root1',
        children: [
          { name: 'child1' }
        ]
      },
      {
        name: 'root2',
        hasChildren: true
      },
      {
        name: 'root3'
      }
    ];
  }

  getChildren$() {
    const newNodes = this.asyncChildren.map((c) => Object.assign({}, c));

    return of(newNodes);
  }

  getChildren(node: any) {
    const newNodes = this.asyncChildren.map((c) => Object.assign({}, c));

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(newNodes), 1000);
    });
  }
}
