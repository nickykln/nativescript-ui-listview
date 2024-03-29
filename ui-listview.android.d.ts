export * from "./ui-listview.common";
import * as viewModule from 'tns-core-modules/ui/core/view';
import * as listViewCommonModule from './ui-listview.common';
import { KeyedTemplate } from "tns-core-modules/ui/core/view";
export declare namespace knownTemplates {
    let itemTemplate: string;
    let itemSwipeTemplate: string;
    let loadOnDemandItemTemplate: string;
    let headerItemTemplate: string;
    let footerItemTemplate: string;
    let groupTemplate: string;
}
export declare namespace knownMultiTemplates {
    const itemTemplates = "itemTemplates";
}
export declare class ReorderHandle extends listViewCommonModule.ReorderHandle {
    constructor();
}
export declare class RadListView extends listViewCommonModule.RadListView {
    private _currentId;
    private _headerView;
    private _footerView;
    private _androidViewId;
    _android: com.telerik.widget.list.RadListView;
    private _rootLayout;
    private _selectionBehavior;
    private _reorderBehavior;
    private _loadOnDemandBehavior;
    private _swipeExecuteBehavior;
    private _swipeActionsBehavior;
    private _pullToRefreshBehavior;
    private _collapsibleGroupsBehavior;
    _listViewAdapter: any;
    private _scrolledPixels;
    private _footerViewHolderChildren;
    private _headerViewHolderChildren;
    private _loadOnDemandViewHolderChildren;
    constructor();
    createNativeView(): globalAndroid.widget.FrameLayout;
    initNativeView(): void;
    disposeNativeView(): void;
    _resetCurrentId(): void;
    _getUniqueItemId(): number;
    readonly androidListView: com.telerik.widget.list.RadListView;
    readonly swipeActionsBehavior: com.telerik.widget.list.SwipeActionsBehavior;
    readonly swipeExecuteBehavior: com.telerik.widget.list.SwipeExecuteBehavior;
    readonly _childrenCount: number;
    eachChildView(callback: (child: viewModule.View) => boolean): void;
    _getViewLayoutParams(): org.nativescript.widgets.CommonLayoutParams;
    isItemSelected(item: any): boolean;
    selectAll(): void;
    deselectAll(): void;
    selectItemAt(index: number): void;
    deselectItemAt(index: number): void;
    getViewForItem(item: any): viewModule.View;
    getSelectedItems(): any[];
    _getGroupTemplateBindingContext(): any;
    protected onPullToRefreshStyleChanged(oldValue: listViewCommonModule.PullToRefreshStyle, newValue: listViewCommonModule.PullToRefreshStyle): void;
    protected onItemViewLoaderChanged(): void;
    protected onItemViewDisposerChanged(): void;
    protected onNativeScriptViewAddedChanged(): void;
    protected onHeaderItemTemplateChanged(oldValue: string, newValue: string): void;
    protected onFooterItemTemplateChanged(oldValue: string, newValue: string): void;
    protected onListViewLayoutChanged(oldValue: listViewCommonModule.ListViewLayoutBase, newValue: listViewCommonModule.ListViewLayoutBase): void;
    protected onItemTemplateSelectorChanged(oldValue: string | ((item: any, index: number, items: any) => string), newValue: string | ((item: any, index: number, items: any) => string)): void;
    protected onItemTemplateChanged(oldValue: string, newValue: string): void;
    protected onGroupTemplateChanged(oldValue: string, newValue: string): void;
    protected onItemTemplatesChanged(oldValue: string | Array<KeyedTemplate>, newValue: string | Array<KeyedTemplate>): void;
    protected itemSwipeTemplateChanged(oldValue: string, newValue: string): void;
    protected onMultipleSelectionChanged(oldValue: boolean, newValue: boolean): void;
    protected onItemReorderChanged(oldValue: boolean, newValue: boolean): void;
    protected onItemSwipeChanged(oldValue: boolean, newValue: boolean): void;
    protected onSwipeActionsChanged(oldValue: boolean, newValue: boolean): void;
    protected onPullToRefreshChanged(oldValue: boolean, newValue: boolean): void;
    protected onLoadOnDemandModeChanged(oldValue: listViewCommonModule.ListViewLoadOnDemandMode, newValue: listViewCommonModule.ListViewLoadOnDemandMode): void;
    protected onLoadOnDemandBufferSizeChanged(oldValue: number, newValue: number): void;
    protected onSelectionBehaviorChanged(oldValue: listViewCommonModule.ListViewSelectionBehavior, newValue: listViewCommonModule.ListViewSelectionBehavior): void;
    protected onLoadOnDemandItemTemplateChanged(oldValue: string, newValue: string): void;
    protected onSourceCollectionChanged(data: any): void;
    protected onEnableCollapsibleGroupsChanged(oldValue: boolean, newValue: boolean): void;
    protected onGroupingFunctionChanged(oldValue: (item: any) => any, newValue: (item: any) => any): void;
    protected onFilteringFunctionChanged(oldValue: (item: any) => boolean, newValue: (item: any) => boolean): void;
    protected onSortingFunctionChanged(oldValue: (item: any, otherItem: any) => number, newValue: (item: any, otherItem: any) => number): void;
    private subscribeForNativeScrollEvents;
    private bindingContextChanged;
    refresh(): void;
    private forceRefreshLayout;
    protected clearEmbeddedViews(): void;
    private recreateEmbeddedViews;
    notifyPullToRefreshFinished(enableLoadOnDemand?: boolean): void;
    notifyLoadOnDemandFinished(disableLoadOnDemand?: boolean): void;
    notifySwipeToExecuteFinished(): void;
    private retrieveNativeSnapMode;
    scrollToIndex(index: number, animate?: boolean, snapMode?: listViewCommonModule.ListViewItemSnapMode): void;
    getScrollOffset(): number;
    onScrolledPixelsChangedBy(by: number): void;
    private _isScrolled;
    scrollWithAmount(amount: number, animate: boolean): void;
    disposeViewHolderViews(views: Array<viewModule.View>): void;
    _updateHeader(): void;
    _updateFooter(): void;
    private updateSwipeActionsBehavior;
    private updateSwipeToExecuteBehavior;
    private updatePullToRefreshBehavior;
    private updateCollapsibleGroupsBehavior;
    private setLoadOnDemandModeInternal;
    private updateLoadOnDemandBehavior;
    private updateReorderBehavior;
    private updateSelectionBehavior;
    private clearFilterDescriptors;
    private clearGroupDescriptors;
    private clearSortDescriptors;
    private loadData;
    private _disableLoadOnDemand;
    private _returnLoadOnDemandMode;
    _getOriginalIndex(inputIndex: number): any;
    private _getNativePosition;
    getFirstVisiblePosition(): any;
}
export declare class AndroidLVLayoutBase extends listViewCommonModule.ListViewLayoutBase {
    private _android;
    owner: RadListView;
    readonly android: any;
    _init(owner: RadListView): void;
    _reset(): void;
    _onOwnerUICreated(): void;
    reset(): void;
    protected getLayoutManager(): any;
    protected onScrollDirectionChanged(oldValue: listViewCommonModule.ListViewScrollDirection, newValue: listViewCommonModule.ListViewScrollDirection): void;
    protected onItemInsertAnimationChanged(oldValue: listViewCommonModule.ListViewItemAnimation, newValue: listViewCommonModule.ListViewItemAnimation): void;
    protected onItemDeleteAnimationChanged(oldValue: listViewCommonModule.ListViewItemAnimation, newValue: listViewCommonModule.ListViewItemAnimation): void;
    private setLayoutOrientation;
    private updateItemAnimator;
    forceRefreshLayout(): void;
}
export declare class ListViewLinearLayout extends AndroidLVLayoutBase {
    constructor();
    protected getLayoutManager(): globalAndroid.support.v7.widget.LinearLayoutManager;
}
export declare class ListViewGridLayout extends ListViewLinearLayout {
    spanCount: number;
    constructor();
    static spanCountProperty: viewModule.Property<ListViewGridLayout, number>;
    private onSpanCountPropertyChanged;
    protected onSpanCountChanged(oldValue: number, newValue: number): void;
    protected onItemHeightChanged(oldValue: number, newValue: number): void;
    protected onItemWidthChanged(oldValue: number, newValue: number): void;
    protected getLayoutManager(): globalAndroid.support.v7.widget.GridLayoutManager;
}
export declare class ListViewStaggeredLayout extends ListViewGridLayout {
    protected getLayoutManager(): any;
    forceRefreshLayout(): void;
}
