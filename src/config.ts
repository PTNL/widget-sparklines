import {
    EDataBlockType,
    EDataQueryMethod,
    EDatasetColumnType,
    EDataQueryFunction,
} from 'ptnl-constructor-sdk/enums';
import { IWidgetConfig } from 'ptnl-constructor-sdk/interfaces';
import { filterBlock, sortBlock } from 'ptnl-constructor-sdk/config-blocks';
import { EBlockKey } from './enum';

export const config: IWidgetConfig = {
    label: {
        ru: 'Sparklines',
        en: 'Sparklines',
    },
    icon: 'icon.svg',
    dataOptions: [
        {
            method: EDataQueryMethod.Aggregate,
            blocks: [
                {
                    type: EDataBlockType.Column,
                    key: EBlockKey.X,
                    dataType: EDatasetColumnType.Dimension,
                    function: EDataQueryFunction.Group,
                    label: {
                        ru: 'X',
                        en: 'X',
                    },
                    max: 1,
                },
                {
                    type: EDataBlockType.Column,
                    key: EBlockKey.Y,
                    dataType: EDatasetColumnType.Fact,
                    function: EDataQueryFunction.Sum,
                    label: {
                        ru: 'Y',
                        en: 'Y',
                    },
                    max: 1,
                },
                ...filterBlock,
                ...sortBlock,
            ],
        },
    ],
};
