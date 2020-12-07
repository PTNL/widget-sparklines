import { Declare, Widget, OnChange } from 'ptnl-constructor-sdk';
import { DefaultDataOptionKey } from 'ptnl-constructor-sdk/constants';
import { EBlockKey } from './enum';

@Declare()
export class Sparklines extends Widget implements OnChange {
    _chart;

    get columns() {
        return this.dataSettings[DefaultDataOptionKey].columnsByBlock;
    }

    get rows(): any[] {
        return this.data[DefaultDataOptionKey];
    }

    get chart(): any {
        if (!this._chart) {
            // @ts-ignore
            this._chart = new window.ApexCharts(
                document.querySelector('#root'),
                this.options,
            );
        }
        return this._chart;
    }

    get options() {
        let total = 0;
        const xRows = [];
        const yRows = [];
        const yName = this.columns[EBlockKey.Y].length
            ? this.columns[EBlockKey.Y][0].name
            : '';

        this.rows.forEach((row) => {
            if (this.columns[EBlockKey.X].length) {
                xRows.push(row[this.columns[EBlockKey.X][0].path]);
            }
            if (this.columns[EBlockKey.Y].length) {
                const value = row[this.columns[EBlockKey.Y][0].path];
                yRows.push(value);
                total += value;
            }
        });

        return {
            chart: {
                type: 'area',
                width: '100%',
                height: '100%',
                sparkline: {
                    enabled: true,
                },
            },

            stroke: {
                curve: 'straight',
            },

            fill: {
                opacity: 0.3,
            },

            colors: ['#00AFD7'],

            title: {
                text: total,
                offsetX: 0,
                style: {
                    fontSize: '24px',
                },
            },

            subtitle: {
                text: yName,
                offsetX: 0,
                style: {
                    fontSize: '14px',
                },
            },

            series: [
                {
                    name: yName,
                    data: yRows,
                },
            ],
            xaxis: {
                categories: xRows,
            },
        };
    }

    onChange(): void {
        if (this._chart) {
            this.chart.updateOptions(this.options);
        } else {
            this.chart.render();
        }
        this.ready();
    }
}
