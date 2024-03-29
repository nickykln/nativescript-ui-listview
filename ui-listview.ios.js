function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./ui-listview.common"));
var viewModule = require("tns-core-modules/ui/core/view");
var observableArray = require("tns-core-modules/data/observable-array");
var commonModule = require("./ui-listview.common");
var utilsModule = require("tns-core-modules/utils/utils");
var colorModule = require("tns-core-modules/color");
var view_1 = require("tns-core-modules/ui/core/view");
var observable_1 = require("tns-core-modules/data/observable");
var grid_layout_1 = require("tns-core-modules/ui/layouts/grid-layout");
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemTemplate = "itemTemplate";
    knownTemplates.itemSwipeTemplate = "itemSwipeTemplate";
    knownTemplates.loadOnDemandItemTemplate = "loadOnDemandItemTemplate";
    knownTemplates.headerItemTemplate = "headerItemTemplate";
    knownTemplates.footerItemTemplate = "footerItemTemplate";
    knownTemplates.groupTemplate = "groupTemplate";
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));
var knownMultiTemplates;
(function (knownMultiTemplates) {
    knownMultiTemplates.itemTemplates = "itemTemplates";
})(knownMultiTemplates = exports.knownMultiTemplates || (exports.knownMultiTemplates = {}));
var ReorderHandle = /** @class */ (function (_super) {
    __extends(ReorderHandle, _super);
    function ReorderHandle() {
        return _super.call(this) || this;
    }
    return ReorderHandle;
}(commonModule.ReorderHandle));
exports.ReorderHandle = ReorderHandle;
var ListViewLayoutBase = /** @class */ (function (_super) {
    __extends(ListViewLayoutBase, _super);
    function ListViewLayoutBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ListViewLayoutBase.prototype, "ios", {
        get: function () {
            if (!this._ios) {
                this._ios = this.getNativeLayout();
                this._ios.dynamicItemSize = this.supportsDynamicSize();
            }
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    ListViewLayoutBase.prototype.supportsDynamicSize = function () {
        return true;
    };
    ListViewLayoutBase.prototype.init = function (owner) {
        this._owner = owner;
        this.syncOwnerScrollDirection(this.scrollDirection);
    };
    ListViewLayoutBase.prototype.reset = function () {
        this._owner = undefined;
    };
    ListViewLayoutBase.prototype.getNativeLayout = function () {
        return undefined;
    };
    ListViewLayoutBase.prototype.onScrollDirectionChanged = function (oldValue, newValue) {
        if (newValue) {
            this.ios.scrollDirection = (newValue === commonModule.ListViewScrollDirection.Horizontal) ?
                1 /* Horizontal */ :
                0 /* Vertical */;
            this.syncOwnerScrollDirection(newValue);
        }
    };
    ListViewLayoutBase.prototype.syncOwnerScrollDirection = function (newScrollDirection) {
        if (this._owner === undefined) {
            return;
        }
        var owner = this._owner.get();
        owner.nativeViewProtected.scrollDirection = (newScrollDirection === commonModule.ListViewScrollDirection.Horizontal) ?
            1 /* Horizontal */ :
            0 /* Vertical */;
    };
    ListViewLayoutBase.prototype.onItemInsertAnimationChanged = function (oldValue, newValue) {
        if (!newValue) {
            return;
        }
        this.ios.animationDuration = 0.5;
        switch (newValue) {
            case commonModule.ListViewItemAnimation.Fade: {
                this.ios.itemInsertAnimation = 1 /* Fade */;
                break;
            }
            case commonModule.ListViewItemAnimation.Scale: {
                this.ios.itemInsertAnimation = 2 /* Scale */;
                break;
            }
            case commonModule.ListViewItemAnimation.Slide: {
                this.ios.itemInsertAnimation = 3 /* Slide */;
                break;
            }
            default:
                this.ios.itemInsertAnimation = 0 /* Default */;
        }
    };
    ListViewLayoutBase.prototype.onItemDeleteAnimationChanged = function (oldValue, newValue) {
        if (!newValue) {
            return;
        }
        this.ios.animationDuration = 0.5;
        switch (newValue) {
            case commonModule.ListViewItemAnimation.Fade: {
                this.ios.itemDeleteAnimation = 1 /* Fade */;
                break;
            }
            case commonModule.ListViewItemAnimation.Scale: {
                this.ios.itemDeleteAnimation = 2 /* Scale */;
                break;
            }
            case commonModule.ListViewItemAnimation.Slide: {
                this.ios.itemDeleteAnimation = 3 /* Slide */;
                break;
            }
            default:
                this.ios.itemDeleteAnimation = 0 /* Default */;
        }
    };
    ListViewLayoutBase.prototype.onItemWidthChanged = function (oldValue, newValue) {
        this.updateIsDynamicSize();
        if (!isNaN(+newValue)) {
            this.updateItemSize();
        }
    };
    ListViewLayoutBase.prototype.onItemHeightChanged = function (oldValue, newValue) {
        this.updateIsDynamicSize();
        if (!isNaN(+newValue)) {
            this.updateItemSize();
        }
    };
    ListViewLayoutBase.prototype.updateIsDynamicSize = function () {
        var dynamicItemSize = this.supportsDynamicSize();
        if (this.scrollDirection === commonModule.ListViewScrollDirection.Vertical) {
            dynamicItemSize = dynamicItemSize && isNaN(this.itemHeight);
        }
        if (this.scrollDirection === commonModule.ListViewScrollDirection.Horizontal) {
            dynamicItemSize = dynamicItemSize && isNaN(this.itemWidth);
        }
        this.ios.dynamicItemSize = dynamicItemSize;
    };
    ListViewLayoutBase.prototype.updateItemSize = function () {
        this.ios.itemSize = CGSizeMake(this.itemWidth ? this.itemWidth : this.ios.itemSize.width, this.itemHeight ? this.itemHeight : this.ios.itemSize.height);
    };
    return ListViewLayoutBase;
}(commonModule.ListViewLayoutBase));
exports.ListViewLayoutBase = ListViewLayoutBase;
var ListViewLinearLayout = /** @class */ (function (_super) {
    __extends(ListViewLinearLayout, _super);
    function ListViewLinearLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListViewLinearLayout.prototype.getNativeLayout = function () {
        return TKListViewLinearLayout.new();
    };
    return ListViewLinearLayout;
}(ListViewLayoutBase));
exports.ListViewLinearLayout = ListViewLinearLayout;
var ListViewGridLayout = /** @class */ (function (_super) {
    __extends(ListViewGridLayout, _super);
    function ListViewGridLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListViewGridLayout.prototype.getNativeLayout = function () {
        return TKListViewGridLayout.new();
    };
    ListViewGridLayout.prototype.supportsDynamicSize = function () {
        return false;
    };
    ListViewGridLayout.prototype.onSpanCountPropertyChanged = function (oldValue, newValue) {
        this.onSpanCountChanged(oldValue, newValue);
    };
    ListViewGridLayout.prototype.onSpanCountChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue)) {
            this.ios.spanCount = newValue;
            if (this._owner) {
                this._owner.get().refresh();
            }
        }
    };
    ListViewGridLayout.prototype.onLineSpacingPropertyChanged = function (oldValue, newValue) {
        this.onLineSpacingChanged(oldValue, newValue);
    };
    ListViewGridLayout.prototype.onLineSpacingChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue)) {
            this.ios.lineSpacing = newValue;
        }
    };
    // NOTE: this property should be defined in common module, but inheritance will not be possible then
    ListViewGridLayout.spanCountProperty = new view_1.Property({
        name: "spanCount",
        defaultValue: undefined,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onSpanCountPropertyChanged(oldValue, newValue);
        },
    });
    // NOTE: this property should be defined in common module, but inheritance will not be possible then
    ListViewGridLayout.lineSpacingProperty = new view_1.Property({
        name: "lineSpacing",
        defaultValue: undefined,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onLineSpacingPropertyChanged(oldValue, newValue);
        },
    });
    return ListViewGridLayout;
}(ListViewLayoutBase));
exports.ListViewGridLayout = ListViewGridLayout;
ListViewGridLayout.spanCountProperty.register(ListViewGridLayout);
ListViewGridLayout.lineSpacingProperty.register(ListViewGridLayout);
var ListViewStaggeredLayout = /** @class */ (function (_super) {
    __extends(ListViewStaggeredLayout, _super);
    function ListViewStaggeredLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //    private _localDelegate;
    ListViewStaggeredLayout.prototype.getNativeLayout = function () {
        var layout = TKListViewStaggeredLayout.new();
        return layout;
    };
    ListViewStaggeredLayout.prototype.supportsDynamicSize = function () {
        return true;
    };
    ListViewStaggeredLayout.prototype.updateItemSize = function () {
    };
    return ListViewStaggeredLayout;
}(ListViewGridLayout));
exports.ListViewStaggeredLayout = ListViewStaggeredLayout;
/////////////////////////////////////////////////////////////
// TKListViewDelegateImpl
var TKListViewDelegateImpl = /** @class */ (function (_super) {
    __extends(TKListViewDelegateImpl, _super);
    function TKListViewDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TKListViewDelegateImpl.initWithOwner = function (owner) {
        var instance = _super.new.call(this);
        instance._owner = owner;
        return instance;
    };
    Object.defineProperty(TKListViewDelegateImpl.prototype, "swipeLimits", {
        get: function () {
            if (!this._swipeLimits) {
                var owner = this._owner.get();
                this._swipeLimits = (owner.listViewLayout.scrollDirection === commonModule.ListViewScrollDirection.Vertical) ?
                    { left: owner.getMeasuredWidth(), top: 0, right: owner.getMeasuredWidth(), bottom: 0, threshold: 0 } :
                    { left: 0, top: owner.getMeasuredHeight(), right: 0, bottom: owner.getMeasuredHeight(), threshold: 0 };
            }
            return this._swipeLimits;
        },
        enumerable: true,
        configurable: true
    });
    TKListViewDelegateImpl.prototype.listViewScrollViewDidScroll = function (listView, scrollView) {
        var owner = this._owner.get();
        var eventData = {
            eventName: commonModule.RadListView.scrolledEvent,
            object: owner,
            scrollOffset: owner.getScrollOffset()
        };
        owner.notify(eventData);
    };
    TKListViewDelegateImpl.prototype.listViewScrollViewWillBeginDragging = function (listView, scrollView) {
        var owner = this._owner.get();
        var eventData = {
            eventName: commonModule.RadListView.scrollStartedEvent,
            object: owner,
            scrollOffset: owner.getScrollOffset()
        };
        owner.notify(eventData);
    };
    TKListViewDelegateImpl.prototype.listViewScrollViewDidEndDraggingWillDecelerate = function (listView, scrollView, willDecelerate) {
        var owner = this._owner.get();
        var eventData = {
            eventName: commonModule.RadListView.scrollDragEndedEvent,
            object: owner,
            scrollOffset: owner.getScrollOffset()
        };
        owner.notify(eventData);
        if (!willDecelerate) {
            eventData = {
                eventName: commonModule.RadListView.scrollEndedEvent,
                object: owner,
                scrollOffset: owner.getScrollOffset()
            };
            owner.notify(eventData);
        }
    };
    TKListViewDelegateImpl.prototype.listViewScrollViewDidEndDecelerating = function (listView, scrollView) {
        var owner = this._owner.get();
        var eventData = {
            eventName: commonModule.RadListView.scrollEndedEvent,
            object: owner,
            scrollOffset: owner.getScrollOffset()
        };
        owner.notify(eventData);
    };
    TKListViewDelegateImpl.prototype.listViewShouldHighlightItemAtIndexPath = function (listView, indexPath) {
        return true;
    };
    TKListViewDelegateImpl.prototype.listViewDidHighlightItemAtIndexPath = function (listView, indexPath) {
    };
    TKListViewDelegateImpl.prototype.listViewDidUnhighlightItemAtIndexPath = function (listView, indexPath) {
    };
    TKListViewDelegateImpl.prototype.listViewShouldSelectItemAtIndexPath = function (listView, indexPath) {
        if (!indexPath) {
            return;
        }
        var owner = this._owner.get();
        var view = owner.getViewForItem(owner.getItemAtIndex(indexPath.row));
        var args = {
            eventName: commonModule.RadListView.itemSelectingEvent,
            object: owner,
            index: this.getIndexForIndexPath(owner, indexPath),
            groupIndex: indexPath.section,
            returnValue: true,
            view: view
        };
        owner.notify(args);
        return args.returnValue;
    };
    TKListViewDelegateImpl.prototype.listViewDidSelectItemAtIndexPath = function (listView, indexPath) {
        if (!indexPath) {
            return;
        }
        var owner = this._owner.get();
        var view = owner.getViewForItem(owner.getItemAtIndex(indexPath.row));
        var args = {
            eventName: commonModule.RadListView.itemSelectedEvent,
            object: owner,
            index: this.getIndexForIndexPath(owner, indexPath),
            groupIndex: indexPath.section,
            view: view
        };
        owner.notify(args);
    };
    TKListViewDelegateImpl.prototype.listViewDidDeselectItemAtIndexPath = function (listView, indexPath) {
        if (!indexPath) {
            return;
        }
        var owner = this._owner.get();
        var view = owner.getViewForItem(owner.getItemAtIndex(indexPath.row));
        var index = this.getIndexForIndexPath(owner, indexPath);
        var args = {
            eventName: commonModule.RadListView.itemDeselectingEvent,
            object: owner,
            index: index,
            groupIndex: indexPath.section,
            returnValue: true,
            view: view
        };
        owner.notify(args);
        var argsDeselected = {
            eventName: commonModule.RadListView.itemDeselectedEvent,
            object: owner,
            index: index,
            groupIndex: indexPath.section,
            view: view
        };
        owner.notify(argsDeselected);
    };
    TKListViewDelegateImpl.prototype.listViewWillReorderItemAtIndexPath = function (listView, indexPath) {
        if (!listView || !indexPath) {
            return false;
        }
        var owner = this._owner.get();
        var view = owner.getViewForItem(owner.getItemAtIndex(indexPath.row));
        var index = this.getIndexForIndexPath(owner, indexPath);
        var args = {
            returnValue: true,
            eventName: commonModule.RadListView.itemReorderStartingEvent,
            object: owner,
            index: index,
            groupIndex: indexPath.section,
            view: view
        };
        owner.notify(args);
        if (!args.returnValue) {
            return false;
        }
        args = {
            eventName: commonModule.RadListView.itemReorderStartedEvent,
            object: owner,
            index: index,
            groupIndex: indexPath.section,
            view: view
        };
        owner.notify(args);
        return true;
    };
    TKListViewDelegateImpl.prototype.listViewDidReorderItemFromIndexPathToIndexPath = function (listView, originalIndexPath, targetIndexPath) {
        if (!listView || !originalIndexPath || !targetIndexPath) {
            return;
        }
        if (originalIndexPath.row === targetIndexPath.row) {
            return;
        }
        var owner = this._owner.get();
        owner._reorderItemInSource(originalIndexPath.row, targetIndexPath.row);
        var view = owner.getViewForItem(owner.getItemAtIndex(targetIndexPath.row));
        var args = {
            eventName: commonModule.RadListView.itemReorderedEvent,
            object: owner,
            index: this.getIndexForIndexPath(owner, originalIndexPath),
            groupIndex: originalIndexPath.section,
            data: { targetIndex: targetIndexPath.row, targetGroupIndex: targetIndexPath.section },
            view: view
        };
        owner.notify(args);
    };
    TKListViewDelegateImpl.prototype.listViewShouldSwipeCellAtIndexPath = function (listView, cell, indexPath) {
        var shouldSwipe = true;
        var owner = this._owner.get();
        var index = this.getIndexForIndexPath(owner, indexPath);
        if (owner.hasListeners(commonModule.RadListView.itemSwipingEvent)) {
            var args = {
                eventName: commonModule.RadListView.itemSwipingEvent,
                object: owner,
                index: index,
                groupIndex: indexPath.section,
                returnValue: true
            };
            owner.notify(args);
            shouldSwipe = args.returnValue;
        }
        if (shouldSwipe) {
            var viewAtIndex = owner._realizedCells.get(cell.tag).view;
            var startArgs = {
                eventName: commonModule.RadListView.itemSwipeProgressStartedEvent,
                object: owner,
                swipeView: viewAtIndex.itemSwipeView,
                mainView: viewAtIndex.itemView,
                index: index,
                groupIndex: indexPath.section,
                data: { swipeLimits: this.swipeLimits }
            };
            owner.notify(startArgs);
            var swipeLimits = startArgs.data.swipeLimits;
            if (swipeLimits) {
                owner.nativeViewProtected.cellSwipeLimits = UIEdgeInsetsFromString("{" + view_1.layout.toDeviceIndependentPixels(swipeLimits.top) + ", " + view_1.layout.toDeviceIndependentPixels(swipeLimits.left) + ", " + view_1.layout.toDeviceIndependentPixels(swipeLimits.bottom) + ", " + view_1.layout.toDeviceIndependentPixels(swipeLimits.right) + "}");
                owner.nativeViewProtected.cellSwipeTreshold = view_1.layout.toDeviceIndependentPixels(swipeLimits.threshold);
            }
        }
        return shouldSwipe;
    };
    TKListViewDelegateImpl.prototype.listViewDidSwipeCellAtIndexPathWithOffset = function (listView, cell, indexPath, offset) {
        if (!indexPath) {
            return;
        }
        var owner = this._owner.get();
        var viewAtIndex = owner._realizedCells.get(cell.tag).view;
        var swipeOffset = { x: view_1.layout.toDevicePixels(offset.x), y: view_1.layout.toDevicePixels(offset.y), swipeLimits: this.swipeLimits };
        var args = {
            eventName: commonModule.RadListView.itemSwipeProgressChangedEvent,
            object: owner,
            swipeView: viewAtIndex.itemSwipeView,
            mainView: viewAtIndex.itemView,
            index: this.getIndexForIndexPath(owner, indexPath),
            groupIndex: indexPath.section,
            data: swipeOffset
        };
        owner.notify(args);
    };
    TKListViewDelegateImpl.prototype.listViewDidFinishSwipeCellAtIndexPathWithOffset = function (listView, cell, indexPath, offset) {
        var owner = this._owner.get();
        if (!indexPath || !owner.hasListeners(commonModule.RadListView.itemSwipeProgressEndedEvent)) {
            return;
        }
        var viewAtIndex = owner._realizedCells.get(cell.tag).view;
        var swipeOffset = { x: offset.x, y: offset.y, swipeLimits: this.swipeLimits };
        var args = {
            eventName: commonModule.RadListView.itemSwipeProgressEndedEvent,
            object: owner,
            swipeView: viewAtIndex.itemSwipeView,
            mainView: viewAtIndex.itemView,
            index: this.getIndexForIndexPath(owner, indexPath),
            groupIndex: indexPath.section,
            data: swipeOffset
        };
        owner.notify(args);
    };
    TKListViewDelegateImpl.prototype.listViewDidPullWithOffset = function (listView, offset) {
    };
    TKListViewDelegateImpl.prototype.listViewDidLongPressCellAtIndexPath = function (listView, cell, indexPath) {
        if (!indexPath) {
            return;
        }
        var owner = this._owner.get();
        var args = {
            eventName: commonModule.RadListView.itemHoldEvent,
            object: owner,
            index: this.getIndexForIndexPath(owner, indexPath),
            groupIndex: indexPath.section
        };
        owner.notify(args);
    };
    TKListViewDelegateImpl.prototype.listViewShouldLoadMoreDataAtIndexPath = function (listView, indexPath) {
        if (!indexPath) {
            return false;
        }
        var owner = this._owner.get();
        var args = {
            eventName: commonModule.RadListView.loadMoreDataRequestedEvent,
            object: owner,
            index: this.getIndexForIndexPath(owner, indexPath),
            groupIndex: indexPath.section,
            returnValue: true
        };
        owner.notify(args);
        return args.returnValue;
    };
    TKListViewDelegateImpl.prototype.listViewShouldRefreshOnPull = function (listView) {
        var owner = this._owner.get();
        var args = {
            eventName: commonModule.RadListView.pullToRefreshInitiatedEvent,
            object: owner,
            returnValue: true
        };
        owner.notify(args);
        return args.returnValue;
    };
    TKListViewDelegateImpl.prototype.didReloadData = function (listView) { };
    TKListViewDelegateImpl.prototype.willInsertItemsAtIndexPaths = function (indexPaths) {
        var owner = this._owner.get();
        owner._insertingItemsWithAnimation = true;
    };
    TKListViewDelegateImpl.prototype.didInsertItems = function () {
        var owner = this._owner.get();
        owner._insertingItemsWithAnimation = false;
        if (owner._shouldDisableLoadOnDemand) {
            owner._disableLoadOnDemand();
        }
        if (owner._shouldReEnableLoadOnDemand) {
            owner._returnLoadOnDemandMode();
        }
    };
    TKListViewDelegateImpl.prototype.getIndexForIndexPath = function (owner, indexPath) {
        var index;
        if (!owner.isDataOperationsEnabled) {
            index = indexPath.row;
        }
        else {
            var tappedItem = owner._getDataItemFromSection(indexPath.row, indexPath.section);
            index = owner.getIndexOf(tappedItem);
        }
        return index;
    };
    TKListViewDelegateImpl.ObjCProtocols = [TKListViewDelegate];
    return TKListViewDelegateImpl;
}(NSObject));
/////////////////////////////////////////////////////////////
// TKListViewDataSourceImpl
var TKListViewDataSourceImpl = /** @class */ (function (_super) {
    __extends(TKListViewDataSourceImpl, _super);
    function TKListViewDataSourceImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TKListViewDataSourceImpl.initWithOwner = function (owner) {
        var instance = _super.new.call(this);
        instance._owner = owner;
        if (instance._owner.get().isDataOperationsEnabled) {
            instance.initDataOperationsSource();
        }
        return instance;
    };
    TKListViewDataSourceImpl.prototype.initDataOperationsSource = function () {
        var listView = this._owner.get();
        if (!listView.items) {
            return;
        }
        var myArray = new Array();
        listView.items.forEach(function (element) {
            myArray.push(element);
        });
        this.nativeTKDataSource = TKDataSource.alloc().initWithItemSource(myArray);
        if (listView.groupingFunction) {
            this.nativeTKDataSource.addGroupDescriptor(TKDataSourceGroupDescriptor.alloc().initWithBlock(listView.groupingFunction));
        }
        else {
            this.nativeTKDataSource.addGroupDescriptor(TKDataSourceGroupDescriptor.alloc().initWithBlock(this.defaultGroupingFunction));
        }
        if (listView.filteringFunction) {
            this.nativeTKDataSource.addFilterDescriptor(TKDataSourceFilterDescriptor.alloc().initWithBlock(listView.filteringFunction));
        }
        if (listView.sortingFunction) {
            this.nativeTKDataSource.addSortDescriptor(TKDataSourceSortDescriptor.alloc().initWithComparator(listView.sortingFunction));
        }
        this.nativeTKDataSource.reloadData();
    };
    TKListViewDataSourceImpl.prototype.listViewNumberOfItemsInSection = function (listView, section) {
        var ownerListView = this._owner.get();
        var result = 0;
        if (!ownerListView.isDataOperationsEnabled) {
            result = ownerListView.items ? ownerListView.items.length : 0;
        }
        else {
            if (!this.nativeTKDataSource || this.nativeTKDataSource.items.count === 0) {
                return 0;
            }
            var groupItem = this.nativeTKDataSource.items[section];
            result = groupItem.items && this.nativeTKDataSource.items.count ? groupItem.items.count : this.nativeTKDataSource.itemSource.length;
        }
        return result;
    };
    TKListViewDataSourceImpl.prototype.listViewCellForItemAtIndexPathIsInitial = function (listView, indexPath, isInitial) {
        var owner = this._owner.get();
        owner._preparingCell = true;
        var loadOnDemandCell = listView.dequeueLoadOnDemandCellForIndexPath(indexPath);
        if (loadOnDemandCell) {
            if (owner.loadOnDemandItemTemplate || owner.itemViewLoader) {
                owner.prepareLoadOnDemandCell(loadOnDemandCell, indexPath);
            }
            loadOnDemandCell.backgroundView.stroke = null;
            owner._preparingCell = false;
            return loadOnDemandCell;
        }
        var templateType = this._owner.get()._getItemTemplateType(indexPath);
        var cell = listView.dequeueReusableCellWithReuseIdentifierForIndexPath(templateType, indexPath);
        if (!cell.view) {
            cell.backgroundView.stroke = null;
            cell.selectedBackgroundView.stroke = null;
            cell.offsetContentViewInMultipleSelection = false;
        }
        owner.prepareCell(cell, indexPath, templateType, !isInitial);
        owner._preparingCell = false;
        return cell;
    };
    TKListViewDataSourceImpl.prototype.numberOfSectionsInListView = function (listView) {
        var owner = this._owner.get();
        var result = 0;
        if (!owner.isDataOperationsEnabled) {
            result = 1;
        }
        else {
            if (!this.nativeTKDataSource) {
                return;
            }
            result = this.nativeTKDataSource.items && this.nativeTKDataSource.items.count ? this.nativeTKDataSource.items.count : 1;
        }
        // TODO: call event handler from public interface
        return result;
    };
    TKListViewDataSourceImpl.prototype.listViewViewForSupplementaryElementOfKindAtIndexPath = function (listView, kind, indexPath) {
        var owner = this._owner.get();
        var cell;
        if (kind === "header" && (owner.headerItemTemplate !== undefined || owner.groupingFunction || owner.itemViewLoader !== undefined)) {
            cell = listView.dequeueReusableSupplementaryViewOfKindWithReuseIdentifierForIndexPath(kind, NSString.stringWithCString("header"), indexPath);
            owner._preparingCell = true;
            owner.prepareHeaderCell(cell, indexPath);
            owner._preparingCell = false;
        }
        else if (kind === "footer" && (owner.footerItemTemplate !== undefined || owner.itemViewLoader !== undefined)) {
            cell = listView.dequeueReusableSupplementaryViewOfKindWithReuseIdentifierForIndexPath(kind, NSString.stringWithCString("footer"), indexPath);
            owner._preparingCell = true;
            owner.prepareFooterCell(cell, indexPath);
            owner._preparingCell = false;
        }
        return cell;
    };
    TKListViewDataSourceImpl.prototype.defaultGroupingFunction = function () {
        return function (item) {
            return item;
        };
    };
    TKListViewDataSourceImpl.ObjCProtocols = [TKListViewDataSource];
    return TKListViewDataSourceImpl;
}(NSObject));
var ExtendedHeaderCell = /** @class */ (function (_super) {
    __extends(ExtendedHeaderCell, _super);
    function ExtendedHeaderCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtendedHeaderCell.new = function () {
        var instance = _super.new.call(this);
        return instance;
    };
    ExtendedHeaderCell.class = function () {
        return ExtendedHeaderCell;
    };
    Object.defineProperty(ExtendedHeaderCell.prototype, "view", {
        get: function () {
            return this._view;
        },
        set: function (value) {
            this._view = value;
        },
        enumerable: true,
        configurable: true
    });
    ExtendedHeaderCell.prototype.systemLayoutSizeFittingSize = function (targetSize) {
        if (this.view && this.view.parent) {
            var listView = this.view.parent;
            listView._preparingCell = true;
            var dimensions = listView.layoutHeaderFooterCell(this);
            listView._preparingCell = false;
            return CGSizeMake(view_1.layout.toDeviceIndependentPixels(dimensions.measuredWidth), view_1.layout.toDeviceIndependentPixels(dimensions.measuredHeight));
        }
        return targetSize;
    };
    ExtendedHeaderCell.prototype.systemLayoutSizeFittingSizeWithHorizontalFittingPriorityVerticalFittingPriority = function (targetSize, horizontalFittingPriority, verticalFittingPriority) {
        if (this.view && this.view.parent) {
            var listView = this.view.parent;
            listView._preparingCell = true;
            var dimensions = listView.layoutHeaderFooterCell(this);
            listView._preparingCell = false;
            return CGSizeMake(view_1.layout.toDeviceIndependentPixels(dimensions.measuredWidth), view_1.layout.toDeviceIndependentPixels(dimensions.measuredHeight));
        }
        return targetSize;
    };
    return ExtendedHeaderCell;
}(TKListViewHeaderCell));
var ExtendedFooterCell = /** @class */ (function (_super) {
    __extends(ExtendedFooterCell, _super);
    function ExtendedFooterCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtendedFooterCell.new = function () {
        var instance = _super.new.call(this);
        return instance;
    };
    ExtendedFooterCell.class = function () {
        return ExtendedFooterCell;
    };
    Object.defineProperty(ExtendedFooterCell.prototype, "view", {
        get: function () {
            return this._view;
        },
        set: function (value) {
            this._view = value;
        },
        enumerable: true,
        configurable: true
    });
    ExtendedFooterCell.prototype.systemLayoutSizeFittingSize = function (targetSize) {
        if (this.view && this.view.parent) {
            var listView = this.view.parent;
            listView._preparingCell = true;
            var dimensions = listView.layoutHeaderFooterCell(this);
            listView._preparingCell = false;
            return CGSizeMake(view_1.layout.toDeviceIndependentPixels(dimensions.measuredWidth), view_1.layout.toDeviceIndependentPixels(dimensions.measuredHeight));
        }
        return targetSize;
    };
    ExtendedFooterCell.prototype.systemLayoutSizeFittingSizeWithHorizontalFittingPriorityVerticalFittingPriority = function (targetSize) {
        if (this.view && this.view.parent) {
            var listView = this.view.parent;
            listView._preparingCell = true;
            var dimensions = listView.layoutHeaderFooterCell(this);
            listView._preparingCell = false;
            return CGSizeMake(view_1.layout.toDeviceIndependentPixels(dimensions.measuredWidth), view_1.layout.toDeviceIndependentPixels(dimensions.measuredHeight));
        }
        return targetSize;
    };
    return ExtendedFooterCell;
}(TKListViewFooterCell));
var ExtendedLoadOnDemandCell = /** @class */ (function (_super) {
    __extends(ExtendedLoadOnDemandCell, _super);
    function ExtendedLoadOnDemandCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtendedLoadOnDemandCell.new = function () {
        var instance = _super.new.call(this);
        return instance;
    };
    ExtendedLoadOnDemandCell.class = function () {
        return ExtendedLoadOnDemandCell;
    };
    ExtendedLoadOnDemandCell.prototype.systemLayoutSizeFittingSize = function (targetSize) {
        if (this.view && this.view.parent) {
            return CGSizeMake(view_1.layout.toDeviceIndependentPixels(this.view.getMeasuredWidth()), view_1.layout.toDeviceIndependentPixels(this.view.getMeasuredHeight()));
        }
        // On iOS the default view doesn't have a size explicitly set so
        // we restrict it here so that it doesn't occupy the whole screen.
        return CGSizeMake(targetSize.width, 44);
    };
    ExtendedLoadOnDemandCell.prototype.willMoveToSuperview = function (newSuperview) {
        var parent = (this.view ? this.view.parent : null);
        // When inside ListView and there is no newSuperview this cell is
        // removed from native visual tree so we remove it from our tree too.
        if (parent && !newSuperview) {
            parent._removeView(this.view);
        }
    };
    Object.defineProperty(ExtendedLoadOnDemandCell.prototype, "view", {
        get: function () {
            return this._view;
        },
        set: function (value) {
            this._view = value;
        },
        enumerable: true,
        configurable: true
    });
    return ExtendedLoadOnDemandCell;
}(TKListViewLoadOnDemandCell));
exports.ExtendedLoadOnDemandCell = ExtendedLoadOnDemandCell;
/////////////////////////////////////////////////////////////
// ExtendedListViewCell
var ExtendedListViewCell = /** @class */ (function (_super) {
    __extends(ExtendedListViewCell, _super);
    function ExtendedListViewCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.touchStarted = false;
        return _this;
    }
    ExtendedListViewCell.new = function () {
        var instance = _super.new.call(this);
        return instance;
    };
    ExtendedListViewCell.class = function () {
        return ExtendedListViewCell;
    };
    ExtendedListViewCell.prototype.willMoveToSuperview = function (newSuperview) {
        var parent = (this.view && this.view.itemView ? this.view.itemView.parent : null);
        // When inside ListView and there is no newSuperview this cell is
        // removed from native visual tree so we remove it from our tree too.
        if (parent && !newSuperview) {
            parent._removeContainer(this);
        }
    };
    ExtendedListViewCell.prototype.systemLayoutSizeFittingSize = function (targetSize) {
        if (this.view && this.view.itemView && this.view.itemView.parent) {
            var owner = this.view.itemView.parent;
            owner._preparingCell = true;
            var dimensions = owner.layoutCell(this, undefined);
            owner._preparingCell = false;
            return CGSizeMake(view_1.layout.toDeviceIndependentPixels(dimensions.measuredWidth), view_1.layout.toDeviceIndependentPixels(dimensions.measuredHeight));
        }
        return targetSize;
    };
    ExtendedListViewCell.prototype.systemLayoutSizeFittingSizeWithHorizontalFittingPriorityVerticalFittingPriority = function (targetSize) {
        if (this.view && this.view.itemView && this.view.itemView.parent) {
            var owner = this.view.itemView.parent;
            owner._preparingCell = true;
            var dimensions = owner.layoutCell(this, undefined);
            owner._preparingCell = false;
            return CGSizeMake(view_1.layout.toDeviceIndependentPixels(dimensions.measuredWidth), view_1.layout.toDeviceIndependentPixels(dimensions.measuredHeight));
        }
        return targetSize;
    };
    // This shows in the profiling. Can it be avoided?
    ExtendedListViewCell.prototype.touchesBeganWithEvent = function (touches, event) {
        _super.prototype.touchesBeganWithEvent.call(this, touches, event);
        if (touches.count !== 1) {
            this.touchStarted = false;
            return;
        }
        this.touchStarted = true;
    };
    // This shows in the profiling. Can it be avoided?
    ExtendedListViewCell.prototype.touchesMovedWithEvent = function (touches, event) {
        _super.prototype.touchesMovedWithEvent.call(this, touches, event);
        this.touchStarted = false;
    };
    ExtendedListViewCell.prototype.touchesEndedWithEvent = function (touches, event) {
        if (touches.count === 1 && this.touchStarted === true && this.view && this.view.itemView && this.view.itemView.parent) {
            var owner = this.view.itemView.parent;
            var allObjects = touches.allObjects;
            var touchEvent = allObjects.objectAtIndex(0);
            var currentIndexPath = owner.nativeViewProtected.indexPathForCell(this);
            // currentIndexPath can be null if just after clicking
            // in a cell the list is scrolled so when the event ended
            // when the tapped cell is not visible anymore, so indexPathForCell
            // does not find the cell
            // TODO: find a more elegant fix than this workaround
            if (currentIndexPath && touchEvent.tapCount === 1) {
                if (owner.hasListeners(commonModule.RadListView.itemTapEvent)) {
                    var args = {
                        ios: touches,
                        eventName: commonModule.RadListView.itemTapEvent,
                        object: owner,
                        view: this.myContentView,
                        index: this.getIndexForIndexPath(owner, currentIndexPath),
                        groupIndex: currentIndexPath.section
                    };
                    owner.notify(args);
                }
            }
        }
        _super.prototype.touchesEndedWithEvent.call(this, touches, event);
    };
    ExtendedListViewCell.prototype.getCurrentIndexPath = function () {
        var owner = this.view.itemView.parent;
        return owner.nativeViewProtected.indexPathForCell(this);
    };
    ExtendedListViewCell.prototype.getIndexForIndexPath = function (owner, indexPath) {
        var index;
        if (!owner.isDataOperationsEnabled) {
            index = indexPath.row;
        }
        else {
            var tappedItem = owner._getDataItemFromSection(indexPath.row, indexPath.section);
            index = owner.getIndexOf(tappedItem);
        }
        return index;
    };
    return ExtendedListViewCell;
}(TKListViewCell));
exports.ExtendedListViewCell = ExtendedListViewCell;
/////////////////////////////////////////////////////////////
// ListView
var RadListView = /** @class */ (function (_super) {
    __extends(RadListView, _super);
    function RadListView() {
        var _this = _super.call(this) || this;
        _this._realizedCells = new Map();
        _this._nextCellTag = 0;
        _this.on("bindingContextChange", _this.bindingContextChanged, _this);
        _this.listViewLayout = new ListViewLinearLayout();
        _this._heights = new Array();
        return _this;
    }
    RadListView.prototype.reloadDataSource = function () {
        this._dataSource = TKListViewDataSourceImpl.initWithOwner(new WeakRef(this));
        this.nativeViewProtected.dataSource = this._dataSource;
    };
    RadListView.prototype.createNativeView = function () {
        return TKListView.new();
    };
    RadListView.prototype.initNativeView = function () {
        var nativeView = this.nativeViewProtected;
        this._delegate = TKListViewDelegateImpl.initWithOwner(new WeakRef(this));
        this.reloadDataSource();
        nativeView.autoresizingMask = 2 /* FlexibleWidth */ | 16 /* FlexibleHeight */;
        nativeView.cellSwipeTreshold = 30; // the treshold after which the cell will auto swipe to the end and will not jump back to the center.
        nativeView.pullToRefreshView.backgroundColor = (new colorModule.Color("White")).ios;
        nativeView.registerClassForCellWithReuseIdentifier(ExtendedListViewCell.class(), this._defaultTemplate.key);
        nativeView.registerClassForSupplementaryViewOfKindWithReuseIdentifier(ExtendedHeaderCell.class(), TKListViewElementKindSectionHeader, NSString.stringWithCString("header"));
        nativeView.registerClassForSupplementaryViewOfKindWithReuseIdentifier(ExtendedFooterCell.class(), TKListViewElementKindSectionFooter, NSString.stringWithCString("footer"));
        nativeView.registerLoadOnDemandCell(ExtendedLoadOnDemandCell.class());
        this.syncItemTemplates();
        this.synchCellReorder();
        this.synchCellSwipe();
        this.synchLoadOnDemandBufferSize();
        this.synchLoadOnDemandMode();
        this.synchPullToRefresh();
        this.synchSelection();
        this.synchSelectionBehavior();
        this.synchReorderMode();
        this.syncListViewLayout(this.listViewLayout);
    };
    RadListView.prototype.disposeNativeView = function () {
        this.nativeViewProtected.dataSource = null;
        this.clearEmbeddedViews();
        _super.prototype.disposeNativeView.call(this);
    };
    RadListView.prototype.setHeightForCell = function (index, value) {
        this._heights[index] = value;
    };
    RadListView.prototype.selectAll = function () {
        _super.prototype.selectAll.call(this);
        for (var i = 0; i < this.items.length; i++) {
            var indexPathToSelect = NSIndexPath.indexPathForRowInSection(i, 0);
            this.nativeViewProtected.selectItemAtIndexPathAnimatedScrollPosition(indexPathToSelect, false, 0 /* None */);
        }
    };
    RadListView.prototype.deselectAll = function () {
        for (var i = 0; i < this.items.length; i++) {
            var indexPathToSelect = NSIndexPath.indexPathForRowInSection(i, 0);
            this.nativeViewProtected.deselectItemAtIndexPathAnimated(indexPathToSelect, false);
        }
    };
    RadListView.prototype.isItemSelected = function (item) {
        var indexOfTargetItem = this.items.indexOf(item);
        var selectedIndexPaths = this.nativeViewProtected.indexPathsForSelectedItems;
        for (var i = 0; i < selectedIndexPaths.count; i++) {
            var indexPath = selectedIndexPaths.objectAtIndex(i);
            if (indexOfTargetItem === indexPath.row) {
                return true;
            }
        }
        return false;
    };
    RadListView.prototype.selectItemAt = function (index) {
        var indexPathToSelect = NSIndexPath.indexPathForRowInSection(index, 0);
        this.nativeViewProtected.selectItemAtIndexPathAnimatedScrollPosition(indexPathToSelect, false, 0 /* None */);
    };
    RadListView.prototype.deselectItemAt = function (index) {
        var indexPathToSelect = NSIndexPath.indexPathForRowInSection(index, 0);
        this.nativeViewProtected.deselectItemAtIndexPathAnimated(indexPathToSelect, false);
    };
    RadListView.prototype.getViewForItem = function (item) {
        if (item === undefined) {
            throw new Error("Item must be an object from the currently assigned source.");
        }
        var result = undefined;
        this._realizedCells.forEach(function (value, key) {
            var cellItemView = value.view.itemView;
            if (cellItemView && cellItemView.bindingContext === item) {
                result = cellItemView;
            }
        }, this);
        return result;
    };
    RadListView.prototype.getSelectedItems = function () {
        var selectedIndexPaths = this.nativeViewProtected.indexPathsForSelectedItems;
        var result = new Array();
        for (var i = 0; i < selectedIndexPaths.count; i++) {
            var indexPath = selectedIndexPaths.objectAtIndex(i);
            var itemCell = indexPath && this.nativeViewProtected.cellForItemAtIndexPath(indexPath);
            var bindingContext = itemCell && itemCell.view && itemCell.view.itemView && itemCell.view.itemView.bindingContext;
            result.push(bindingContext ? bindingContext : this.getItemAtIndex(indexPath.row));
        }
        return result;
    };
    RadListView.prototype.bindingContextChanged = function (data) {
        // We need this to calculate the header-footer size based on bindings to the context.
        if (data.value !== undefined) {
            this.updateHeaderFooter();
        }
    };
    RadListView.prototype.updateHeaderFooter = function () {
        if (this.nativeViewProtected && this.nativeViewProtected.layout) {
            var scrollDirection = this.listViewLayout.scrollDirection;
            var sizeRestriction = {
                width: scrollDirection === commonModule.ListViewScrollDirection.Vertical ? this.getMeasuredWidth() : undefined,
                height: scrollDirection === commonModule.ListViewScrollDirection.Vertical ? undefined : this.getMeasuredHeight()
            };
            var groupTempView = this.getViewForViewType(commonModule.ListViewViewType.GroupView);
            var tempView = groupTempView != null && this.isDataOperationsEnabled ? groupTempView : this.getViewForViewType(commonModule.ListViewViewType.HeaderView);
            if (tempView) {
                this.disableIosOverflowSafeArea(tempView);
                this._addView(tempView);
                tempView.bindingContext = this.bindingContext;
                var measuredSize = this.measureCell(tempView, sizeRestriction);
                this.nativeViewProtected.layout.headerReferenceSize =
                    CGSizeMake(view_1.layout.toDeviceIndependentPixels(measuredSize.measuredWidth), view_1.layout.toDeviceIndependentPixels(measuredSize.measuredHeight));
                this._removeView(tempView);
            }
            else {
                this.nativeViewProtected.layout.headerReferenceSize = CGSizeMake(0, 0);
            }
            tempView = this.getViewForViewType(commonModule.ListViewViewType.FooterView);
            if (tempView) {
                this.disableIosOverflowSafeArea(tempView);
                this._addView(tempView);
                tempView.bindingContext = this.bindingContext;
                var measuredSize = this.measureCell(tempView, sizeRestriction);
                this.nativeViewProtected.layout.footerReferenceSize =
                    CGSizeMake(view_1.layout.toDeviceIndependentPixels(measuredSize.measuredWidth), view_1.layout.toDeviceIndependentPixels(measuredSize.measuredHeight));
                this._removeView(tempView);
            }
            else {
                this.nativeViewProtected.layout.footerReferenceSize = CGSizeMake(0, 0);
            }
            this.refresh();
        }
    };
    RadListView.prototype.onReorderModeChanged = function (oldValue, newValue) {
        this.synchReorderMode();
    };
    RadListView.prototype.onListViewLayoutChanged = function (oldValue, newValue) {
        if (oldValue) {
            oldValue.reset();
        }
        this.syncListViewLayout(newValue);
    };
    RadListView.prototype.onItemTemplateSelectorChanged = function (oldValue, newValue) {
        _super.prototype.onItemTemplateSelectorChanged.call(this, oldValue, newValue);
        this.refresh();
    };
    RadListView.prototype.syncListViewLayout = function (newValue) {
        var newLayout = newValue;
        if (newLayout && this.nativeViewProtected) {
            this.nativeViewProtected.layout = newValue.ios;
            this.refresh();
            newLayout.init(new WeakRef(this));
            this.updateHeaderFooter();
            this.nativeViewProtected.cellSwipeLimits =
                (newLayout.scrollDirection === commonModule.ListViewScrollDirection.Horizontal) ?
                    UIEdgeInsetsFromString("{60, 0, 60, 0}") : UIEdgeInsetsFromString("{0, 60, 0, 60}");
        }
    };
    RadListView.prototype.clearRealizedCells = function () {
        var that = new WeakRef(this);
        this._realizedCells.forEach(function (value, key) {
            that.get()._removeContainer(value);
            that.get()._clearCellViews(value);
        }, that);
        this._realizedCells.clear();
        this._nextCellTag = 0;
    };
    RadListView.prototype._clearCellViews = function (cell) {
        if (cell && cell.view) {
            if (cell.view.itemView && cell.view.itemView.nativeViewProtected) {
                cell.view.itemView.nativeViewProtected.removeFromSuperview();
            }
            if (cell.view.itemSwipeView && cell.view.itemSwipeView.nativeViewProtected) {
                cell.view.itemView.nativeViewProtected.removeFromSuperview();
            }
            if (cell.view.nativeViewProtected) {
                cell.view.nativeViewProtected.removeFromSuperview();
            }
            cell.view = undefined;
            cell.myContentView = undefined;
        }
    };
    RadListView.prototype.onItemTemplateChanged = function (oldValue, newValue) {
        if (!newValue) {
            return;
        }
        this.refresh();
    };
    RadListView.prototype.onGroupTemplateChanged = function (oldValue, newValue) {
        _super.prototype.onGroupTemplateChanged.call(this, oldValue, newValue);
        this.clearCellsAndUpdateHeaderFooter();
    };
    RadListView.prototype.onItemTemplatesChanged = function (oldValue, newValue) {
        _super.prototype.onItemTemplatesChanged.call(this, oldValue, newValue);
        this.syncItemTemplates();
    };
    RadListView.prototype.onLoadOnDemandItemTemplateChanged = function (oldValue, newValue) {
        if (!newValue || !this.nativeViewProtected) {
            return;
        }
        if (this._loadOnDemandModeInternal === commonModule.ListViewLoadOnDemandMode.Auto) {
            // this.nativeViewProtected.loadOnDemandView = builder.parse(this.loadOnDemandItemTemplate).ios;
            var loadOnDemandView = this.getViewForViewType(commonModule.ListViewViewType.LoadOnDemandView);
            if (loadOnDemandView) {
                this.nativeViewProtected.loadOnDemandView = loadOnDemandView.ios;
            }
        }
        this.refresh();
    };
    RadListView.prototype.onItemSwipeTemplateChanged = function (oldValue, newValue) {
        if (!newValue) {
            return;
        }
        this.refresh();
    };
    RadListView.prototype.onMultipleSelectionChanged = function (oldValue, newValue) {
        this.synchSelection();
    };
    RadListView.prototype.onHeaderItemTemplateChanged = function (oldValue, newValue) {
        _super.prototype.onHeaderItemTemplateChanged.call(this, oldValue, newValue);
        this.clearCellsAndUpdateHeaderFooter();
    };
    RadListView.prototype.onFooterItemTemplateChanged = function (oldValue, newValue) {
        _super.prototype.onFooterItemTemplateChanged.call(this, oldValue, newValue);
        this.clearCellsAndUpdateHeaderFooter();
    };
    RadListView.prototype.onEnableCollapsibleGroupsChanged = function (oldValue, newValue) {
        console.log("Warning: The 'Collapsible Groups' feature is not supported on iOS");
    };
    RadListView.prototype.onGroupingFunctionChanged = function (oldValue, newValue) {
        _super.prototype.onGroupingFunctionChanged.call(this, oldValue, newValue);
        this.clearCellsAndUpdateHeaderFooter();
    };
    RadListView.prototype.onFilteringFunctionChanged = function (oldValue, newValue) {
        this.refresh();
    };
    RadListView.prototype.onSortingFunctionChanged = function (oldValue, newValue) {
        this.refresh();
    };
    RadListView.prototype._removeContainer = function (cell) {
        if (cell && cell.view) {
            var view = cell.view.itemView ? cell.view.itemView : cell.view;
            var swipeView = cell.view.itemSwipeView;
            // // This is to clear the StackLayout that is used to wrap ProxyViewContainer instances.
            // if (!(view.parent instanceof RadListView)) {
            //     this._removeView(view.parent);
            // }
            if (view) {
                this._removeView(view);
                if (swipeView) {
                    this._removeView(swipeView);
                }
                if (this._realizedCells.get(cell.tag)) {
                    this._realizedCells.delete(cell.tag);
                }
            }
        }
    };
    RadListView.prototype.synchReorderMode = function () {
        if (!this.nativeViewProtected) {
            return;
        }
        if (this.reorderMode && this.reorderMode === commonModule.ListViewReorderMode.Drag) {
            this.nativeViewProtected.reorderMode = 0 /* WithHandle */;
        }
        else if (this.reorderMode && this.reorderMode === commonModule.ListViewReorderMode.HoldAndDrag) {
            this.nativeViewProtected.reorderMode = 1 /* WithLongPress */;
        }
        this.refresh();
    };
    RadListView.prototype.isSwipeEnabled = function () {
        return this.itemSwipe || this.swipeActions;
    };
    RadListView.prototype.syncItemTemplates = function () {
        if (this.nativeViewProtected) {
            for (var i = 0, length_1 = this._itemTemplatesInternal.length; i < length_1; i++) {
                this.nativeViewProtected.registerClassForCellWithReuseIdentifier(ExtendedListViewCell.class(), this._itemTemplatesInternal[i].key.toLowerCase());
            }
        }
    };
    RadListView.prototype.synchSelection = function () {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.allowsMultipleSelection = (this.multipleSelection ? true : false);
        }
    };
    RadListView.prototype.onItemReorderChanged = function (oldValue, newValue) {
        this.synchCellReorder();
    };
    RadListView.prototype.synchCellReorder = function () {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.allowsCellReorder = (this.itemReorder ? true : false);
        }
    };
    RadListView.prototype.clearCellsAndUpdateHeaderFooter = function () {
        this.clearEmbeddedViews();
        this.updateHeaderFooter();
    };
    RadListView.prototype.onItemSwipeChanged = function (oldValue, newValue) {
        _super.prototype.onItemSwipeChanged.call(this, oldValue, newValue);
        this.synchCellSwipe();
    };
    RadListView.prototype.onSwipeActionsChanged = function (oldValue, newValue) {
        _super.prototype.onSwipeActionsChanged.call(this, oldValue, newValue);
        this.synchCellSwipe();
    };
    RadListView.prototype.synchCellSwipe = function () {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.allowsCellSwipe = this.isSwipeEnabled() ? true : false;
        }
    };
    RadListView.prototype.onPullToRefreshChanged = function (oldValue, newValue) {
        this.synchPullToRefresh();
    };
    RadListView.prototype.synchPullToRefresh = function () {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.allowsPullToRefresh = (this.pullToRefresh ? true : false);
            var style = this.pullToRefreshStyle;
            if (style) {
                if (style.indicatorColor) {
                    this.nativeViewProtected.pullToRefreshView.activityIndicator.color = style.indicatorColor.ios;
                }
                if (style.indicatorBackgroundColor) {
                    this.nativeViewProtected.pullToRefreshView.activityIndicator.backgroundColor = style.indicatorBackgroundColor.ios;
                    this.nativeViewProtected.pullToRefreshView.backgroundColor = style.indicatorBackgroundColor.ios;
                }
            }
        }
    };
    RadListView.prototype.onPullToRefreshStyleChanged = function (oldValue, newValue) {
        this.synchPullToRefresh();
    };
    RadListView.prototype.onLoadOnDemandModeChanged = function (oldValue, newValue) {
        this.setLoadOnDemandModeInternal(newValue);
    };
    RadListView.prototype.setLoadOnDemandModeInternal = function (value) {
        this._loadOnDemandModeInternal = value;
        this.synchLoadOnDemandMode();
    };
    RadListView.prototype.synchLoadOnDemandMode = function () {
        if (this.nativeViewProtected && this._loadOnDemandModeInternal) {
            if (commonModule.ListViewLoadOnDemandMode.Auto === this._loadOnDemandModeInternal) {
                this.nativeViewProtected.loadOnDemandMode = 2 /* Auto */;
            }
            else if (commonModule.ListViewLoadOnDemandMode.Manual === this._loadOnDemandModeInternal) {
                this.nativeViewProtected.loadOnDemandMode = 1 /* Manual */;
            }
            else
                this.nativeViewProtected.loadOnDemandMode = 0 /* None */;
        }
    };
    RadListView.prototype.onLoadOnDemandBufferSizeChanged = function (oldValue, newValue) {
        this.synchLoadOnDemandBufferSize();
    };
    RadListView.prototype.synchLoadOnDemandBufferSize = function () {
        if (this.loadOnDemandBufferSize !== undefined && this.nativeViewProtected) {
            this.nativeViewProtected.loadOnDemandBufferSize = this.loadOnDemandBufferSize;
        }
    };
    RadListView.prototype.onSelectionBehaviorChanged = function (oldValue, newValue) {
        this.synchSelectionBehavior();
    };
    RadListView.prototype.synchSelectionBehavior = function () {
        if (this.selectionBehavior && this.nativeViewProtected) {
            if (commonModule.ListViewSelectionBehavior.Press === this.selectionBehavior) {
                this.nativeViewProtected.selectionBehavior = 1 /* Press */;
            }
            else if (commonModule.ListViewSelectionBehavior.LongPress === this.selectionBehavior) {
                this.nativeViewProtected.selectionBehavior = 2 /* LongPress */;
            }
            else
                this.nativeViewProtected.selectionBehavior = 0 /* None */;
        }
    };
    RadListView.prototype.getDataItem = function (index) {
        return this.items.getItem ? this.items.getItem(index) : this.items[index];
    };
    RadListView.prototype._getDataItemFromSection = function (index, section, isGroup) {
        var dataSourceImp = (this._dataSource);
        if (!dataSourceImp ||
            dataSourceImp.nativeTKDataSource.items.count <= section ||
            dataSourceImp.nativeTKDataSource.items[section].items.count <= index) {
            return this.getDataItem(index);
        }
        var dataItem = dataSourceImp.nativeTKDataSource.items[section].items[index];
        var value = null;
        if (isGroup) {
            value = { category: this.groupingFunction(dataItem) };
        }
        else {
            value = dataItem;
        }
        return value ? value : this.getDataItem(index);
    };
    RadListView.prototype.prepareItem = function (item, index, section) {
        if (!item) {
            return;
        }
        item.bindingContext = this.getDataItem(index);
    };
    RadListView.prototype.prepareItemFromSection = function (item, index, section) {
        if (!item) {
            return;
        }
        item.bindingContext = this._getDataItemFromSection(index, section);
    };
    RadListView.prototype.requestLayout = function () {
        // When preparing cell don't call super - no need to invalidate our measure when cell desiredSize is changed.
        if (!this._preparingCell) {
            _super.prototype.requestLayout.call(this);
        }
    };
    RadListView.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        _super.prototype.onMeasure.call(this, widthMeasureSpec, heightMeasureSpec);
        if (this._currentHeightSpec !== heightMeasureSpec || this._currentWidthSpec !== widthMeasureSpec) {
            this._currentWidthSpec = widthMeasureSpec;
            this._currentHeightSpec = heightMeasureSpec;
            this.updateHeaderFooter();
        }
    };
    Object.defineProperty(RadListView.prototype, "_childrenCount", {
        get: function () {
            var count = 0;
            if (this._realizedCells) {
                var currentSize = this._realizedCells.size;
                if (this.isSwipeEnabled() === true) {
                    return currentSize * 2;
                }
                return currentSize;
            }
            return count;
        },
        enumerable: true,
        configurable: true
    });
    RadListView.prototype.eachChildView = function (callback) {
        if (this._realizedCells) {
            this._realizedCells.forEach(function (value, key) {
                if (value.view.itemView) {
                    callback(value.view.itemView);
                }
                if (value.view.itemSwipeView) {
                    callback(value.view.itemSwipeView);
                }
                if (value instanceof ExtendedHeaderCell) {
                    callback(value.view);
                }
                if (value instanceof ExtendedFooterCell) {
                    callback(value.view);
                }
            }, this);
        }
    };
    RadListView.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        this.nativeViewProtected.delegate = this._delegate;
        if (this._isDataDirty) {
            this.refresh();
        }
    };
    RadListView.prototype.onUnloaded = function () {
        _super.prototype.onUnloaded.call(this);
        this.nativeViewProtected.delegate = null;
    };
    RadListView.prototype.scrollWithAmount = function (amount, animate) {
        if (this.nativeViewProtected) {
            var layoutVertical = this.listViewLayout.scrollDirection === commonModule.ListViewScrollDirection.Vertical ? true : false;
            var currentOffset = this.nativeViewProtected.contentOffset;
            if (layoutVertical) {
                this.nativeViewProtected.setContentOffsetAnimated(new CGPoint({ x: currentOffset.x, y: amount + currentOffset.y }), animate);
            }
            else {
                this.nativeViewProtected.setContentOffsetAnimated(new CGPoint({ x: amount + currentOffset.x, y: currentOffset.y }), animate);
            }
        }
    };
    RadListView.prototype.getScrollOffset = function () {
        if (!this.nativeViewProtected) {
            return _super.prototype.getScrollOffset.call(this);
        }
        if (this.listViewLayout.scrollDirection === commonModule.ListViewScrollDirection.Vertical) {
            var verticalOffset = this.nativeViewProtected.safeAreaInsets ? this.nativeViewProtected.safeAreaInsets.top : 0;
            return this.nativeViewProtected.contentOffset.y + verticalOffset;
        }
        else {
            var horizontalOffset = this.nativeViewProtected.safeAreaInsets ? this.nativeViewProtected.safeAreaInsets.left : 0;
            return this.nativeViewProtected.contentOffset.x + horizontalOffset;
        }
    };
    RadListView.prototype.resolveNativeSnapPosition = function (snapMode) {
        if (snapMode) {
            var nativeSnapMode = 0 /* None */;
            if (this.listViewLayout.scrollDirection === commonModule.ListViewScrollDirection.Vertical) {
                switch (snapMode) {
                    case commonModule.ListViewItemSnapMode.Start:
                        nativeSnapMode = 1 /* Top */;
                        break;
                    case commonModule.ListViewItemSnapMode.End:
                        nativeSnapMode = 4 /* Bottom */;
                        break;
                    case commonModule.ListViewItemSnapMode.Center:
                        nativeSnapMode = 2 /* CenteredVertically */;
                        break;
                }
            }
            else {
                switch (snapMode) {
                    case commonModule.ListViewItemSnapMode.Start:
                        nativeSnapMode = 8 /* Left */;
                        break;
                    case commonModule.ListViewItemSnapMode.End:
                        nativeSnapMode = 32 /* Right */;
                        break;
                    case commonModule.ListViewItemSnapMode.Center:
                        nativeSnapMode = 16 /* CenteredHorizontally */;
                        break;
                }
            }
            return nativeSnapMode;
        }
        if (!this.scrollPosition) {
            if (this.listViewLayout.scrollDirection === commonModule.ListViewScrollDirection.Vertical) {
                return 1 /* Top */;
            }
            else {
                return 8 /* Left */;
            }
        }
        else {
            switch (this.scrollPosition) {
                case commonModule.ListViewScrollPosition.Bottom:
                    return 4 /* Bottom */;
                case commonModule.ListViewScrollPosition.CenteredHorizontally:
                    return 16 /* CenteredHorizontally */;
                case commonModule.ListViewScrollPosition.CenteredVertically:
                    return 2 /* CenteredVertically */;
                case commonModule.ListViewScrollPosition.Left:
                    return 8 /* Left */;
                case commonModule.ListViewScrollPosition.None:
                    return 0 /* None */;
                case commonModule.ListViewScrollPosition.Right:
                    return 32 /* Right */;
                case commonModule.ListViewScrollPosition.Top:
                    return 1 /* Top */;
            }
        }
    };
    RadListView.prototype.scrollToIndex = function (index, animate, snapMode) {
        if (animate === void 0) { animate = false; }
        if (snapMode === void 0) { snapMode = commonModule.ListViewItemSnapMode.Auto; }
        if (this.nativeViewProtected) {
            var snapPosition = this.resolveNativeSnapPosition(snapMode);
            var item = index;
            var section_1 = 0;
            if (this.isDataOperationsEnabled) {
                var manipulatedIndexPath = this.getItemIndexPath(index);
                item = manipulatedIndexPath.row;
                section_1 = manipulatedIndexPath.section;
            }
            this.nativeViewProtected.scrollToItemAtIndexPathAtScrollPositionAnimated(NSIndexPath.indexPathForItemInSection(item, section_1), snapPosition, animate);
        }
    };
    RadListView.prototype.getItemIndexPath = function (index) {
        if (this.isDataOperationsEnabled) {
            return this._dataSource.nativeTKDataSource.findItem(this.items.getItem(index));
        }
        else {
            return NSIndexPath.indexPathForItemInSection(index, 0);
        }
    };
    RadListView.prototype.notifyPullToRefreshFinished = function (enableLoadOnDemand) {
        if (enableLoadOnDemand) {
            this._shouldReEnableLoadOnDemand = true;
            if (!this._insertingItemsWithAnimation) {
                this._returnLoadOnDemandMode();
            }
        }
        if (this.nativeViewProtected) {
            this.nativeViewProtected.didRefreshOnPull();
        }
    };
    RadListView.prototype.notifyLoadOnDemandFinished = function (disableLoadOnDemand) {
        if (disableLoadOnDemand) {
            this._shouldDisableLoadOnDemand = true;
            if (!this._insertingItemsWithAnimation) {
                this._disableLoadOnDemand();
            }
        }
        if (this.nativeViewProtected) {
            this.nativeViewProtected.didLoadDataOnDemand();
        }
    };
    RadListView.prototype._disableLoadOnDemand = function () {
        this._shouldDisableLoadOnDemand = false;
        this.setLoadOnDemandModeInternal(commonModule.ListViewLoadOnDemandMode.None);
    };
    // TODO: This can be used for https://github.com/telerik/nativescript-ui-feedback/issues/790
    RadListView.prototype._returnLoadOnDemandMode = function () {
        this._shouldReEnableLoadOnDemand = false;
        if (this.loadOnDemandMode) {
            this.setLoadOnDemandModeInternal(this.loadOnDemandMode);
        }
    };
    RadListView.prototype.notifySwipeToExecuteFinished = function () {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.endSwipe(true);
        }
    };
    RadListView.prototype.refresh = function () {
        _super.prototype.refresh.call(this);
        this._realizedCells.forEach(function (cell, nativeView, map) {
            if (!(cell.view.bindingContext instanceof observable_1.Observable)) {
                cell.view.bindingContext = null;
            }
        });
        if (this.isLoaded) {
            this.reloadDataSource();
            this.nativeViewProtected.reloadData();
            this.requestLayout();
            var args = {
                eventName: commonModule.RadListView.dataPopulatedEvent,
                object: this
            };
            this.notify(args);
            this._isDataDirty = false;
        }
        else {
            this._isDataDirty = true;
        }
    };
    RadListView.prototype.onSourceCollectionChanged = function (data) {
        if (!this.nativeViewProtected) {
            return;
        }
        if (this.isDataOperationsEnabled) {
            var myArray_1 = new Array();
            this.items.forEach(function (element) {
                myArray_1.push(element);
            });
            this._dataSource.nativeTKDataSource.itemSource = myArray_1;
            this.nativeViewProtected.reloadData();
            return;
        }
        if (data.action === observableArray.ChangeType.Delete) {
            var nativeSource = NSMutableArray.new();
            nativeSource.addObject(NSIndexPath.indexPathForRowInSection(data.index, 0));
            this.unbindUnusedCells(data.removed);
            this.nativeViewProtected.deleteItemsAtIndexPaths(nativeSource);
        }
        else if (data.action === observableArray.ChangeType.Add) {
            var nativePaths = NSMutableArray.alloc().init();
            for (var i = 0; i < data.addedCount; i++) {
                nativePaths.addObject(NSIndexPath.indexPathForRowInSection(data.index + i, 0));
            }
            if (this.nativeViewProtected.collectionView.dragging) {
                // Adjust the content offset to force stop the drag:
                this.nativeViewProtected.collectionView.setContentOffsetAnimated(this.nativeViewProtected.collectionView.contentOffset, false);
            }
            this.nativeViewProtected.insertItemsAtIndexPaths(nativePaths);
            // Reload the items to avoid duplicate Load on Demand indicators:
            this.nativeViewProtected.collectionView.reloadItemsAtIndexPaths(nativePaths);
        }
        else if (data.action === observableArray.ChangeType.Splice) {
            if (data.removed && (data.removed.length > 0)) {
                var nativeSource = NSMutableArray.new();
                for (var i = 0; i < data.removed.length; i++) {
                    nativeSource.addObject(NSIndexPath.indexPathForRowInSection(data.index + i, 0));
                }
                this.unbindUnusedCells(data.removed);
                this.nativeViewProtected.deleteItemsAtIndexPaths(nativeSource);
            }
            else {
                var nativeSource = NSMutableArray.new();
                for (var i = 0; i < data.addedCount; i++) {
                    nativeSource.addObject(NSIndexPath.indexPathForRowInSection(data.index + i, 0));
                }
                this.nativeViewProtected.insertItemsAtIndexPaths(nativeSource);
            }
        }
        else if (data.action === observableArray.ChangeType.Update) {
            _super.prototype.onSourceCollectionChanged.call(this, data);
        }
    };
    RadListView.prototype.onItemViewDisposerChanged = function () {
    };
    RadListView.prototype.onNativeScriptViewAddedChanged = function () {
    };
    // Clears all views and related views from all templates and also resets the realized cells.
    // Usage: Use when you want to fully clear all views created by the template parsing mechanisum of the RadListView.
    RadListView.prototype.clearEmbeddedViews = function () {
        this.clearRealizedCells();
        if (this.itemViewDisposer !== undefined) {
            this.itemViewDisposer();
        }
    };
    // TODO: See if this is needed as it is not referenced, if not remove it.
    RadListView.prototype.hasFixedItemSize = function () {
        var listViewLayout = this.listViewLayout;
        if (listViewLayout.scrollDirection === commonModule.ListViewScrollDirection.Vertical) {
            return !isNaN(listViewLayout.itemHeight);
        }
        if (listViewLayout.scrollDirection === commonModule.ListViewScrollDirection.Horizontal) {
            return !isNaN(listViewLayout.itemWidth);
        }
        return false;
    };
    RadListView.prototype.unbindUnusedCells = function (removedDataItems) {
        this._realizedCells.forEach(function (value, key) {
            if (!value || !value.view || !value.view.itemView || !value.view.itemView.bindingContext) {
                return;
            }
            if (removedDataItems.indexOf(value.view.itemView.bindingContext) !== -1) {
                value.view.itemView.bindingContext = undefined;
                if (value.view.itemSwipeView) {
                    value.view.itemSwipeView.bindingContext = undefined;
                }
            }
        }, this);
    };
    RadListView.prototype.getLoadOnDemandItemTemplateContent = function () {
        return this.getViewForViewType(commonModule.ListViewViewType.LoadOnDemandView);
    };
    RadListView.prototype._getItemTemplateType = function (indexPath) {
        var selector = this.itemTemplateSelector;
        var type = this._defaultTemplate.key;
        if (selector) {
            if (this.isDataOperationsEnabled) {
                var item = this._getDataItemFromSection(indexPath.item, indexPath.section, false);
                type = selector(item, this.items.indexOf(item), this.items);
            }
            else {
                type = selector(this.getItemAtIndex(indexPath.item), indexPath.item, this.items);
            }
        }
        return type.toLowerCase();
    };
    RadListView.prototype.getItemTemplateContent = function (index, templateType) {
        var cellViews = new Object();
        cellViews.itemView = this.getViewForViewType(commonModule.ListViewViewType.ItemView, templateType);
        cellViews.itemSwipeView = this.getViewForViewType(commonModule.ListViewViewType.ItemSwipeView);
        return cellViews;
    };
    RadListView.prototype.layoutHeaderFooterCell = function (cell) {
        var scrollDirection = this.listViewLayout.scrollDirection;
        var sizeRestriction = {
            width: scrollDirection === commonModule.ListViewScrollDirection.Vertical ? this.getMeasuredWidth() : undefined,
            height: scrollDirection === commonModule.ListViewScrollDirection.Vertical ? undefined : this.getMeasuredHeight()
        };
        var itemViewDimensions = this.measureCell(cell.view, sizeRestriction);
        var cellView = cell.view;
        if (cellView) {
            viewModule.View.layoutChild(this, cellView, 0, 0, itemViewDimensions.measuredWidth, itemViewDimensions.measuredHeight);
        }
        return itemViewDimensions;
    };
    RadListView.prototype.layoutLoadOnDemandCell = function (cell) {
        var scrollDirection = this.listViewLayout.scrollDirection;
        var sizeRestriction = {
            width: scrollDirection === commonModule.ListViewScrollDirection.Vertical ? this.getMeasuredWidth() : undefined,
            height: scrollDirection === commonModule.ListViewScrollDirection.Vertical ? undefined : this.getMeasuredHeight()
        };
        var itemViewDimensions = this.measureCell(cell.view, sizeRestriction);
        var cellView = cell.view;
        if (cellView) {
            viewModule.View.layoutChild(this, cellView, 0, 0, itemViewDimensions.measuredWidth, itemViewDimensions.measuredHeight);
        }
        return itemViewDimensions;
    };
    RadListView.prototype.layoutCell = function (cell, indexPath) {
        var itemViewDimensions = this.measureCell(cell.view.itemView, indexPath);
        var cellView = cell.view.itemView;
        if (cellView && cellView['isLayoutRequired']) {
            viewModule.View.layoutChild(this, cellView, 0, 0, itemViewDimensions.measuredWidth, itemViewDimensions.measuredHeight);
        }
        var swipeViewDimensions = this.measureCell(cell.view.itemSwipeView, { width: itemViewDimensions.measuredWidth, height: itemViewDimensions.measuredHeight });
        var backgroundView = cell.view.itemSwipeView;
        if (backgroundView && backgroundView['isLayoutRequired']) {
            viewModule.View.layoutChild(this, backgroundView, 0, 0, swipeViewDimensions.measuredWidth, swipeViewDimensions.measuredHeight);
        }
        return itemViewDimensions;
    };
    RadListView.prototype.measureCell = function (cellView, sizeRestriction) {
        if (cellView) {
            var listViewLayout = this.listViewLayout;
            var itemWidth = isNaN(listViewLayout.itemWidth) ? undefined : view_1.layout.toDevicePixels(listViewLayout.itemWidth);
            var itemHeight = isNaN(listViewLayout.itemHeight) ? undefined : view_1.layout.toDevicePixels(listViewLayout.itemHeight);
            if (sizeRestriction !== undefined) {
                itemWidth = sizeRestriction.width;
                itemHeight = sizeRestriction.height;
            }
            var heightSpec = void 0, widthSpec = void 0;
            var spanCount = !isNaN(listViewLayout.spanCount) ? listViewLayout.spanCount : 1;
            if (listViewLayout.scrollDirection === commonModule.ListViewScrollDirection.Vertical) {
                itemWidth = (itemWidth === undefined) ? this.getMeasuredWidth() / spanCount : itemWidth;
                if (itemHeight === undefined) {
                    heightSpec = utilsModule.layout.makeMeasureSpec(0, utilsModule.layout.UNSPECIFIED);
                }
                else {
                    heightSpec = utilsModule.layout.makeMeasureSpec(itemHeight, utilsModule.layout.EXACTLY);
                }
                widthSpec = utilsModule.layout.makeMeasureSpec(itemWidth, utilsModule.layout.EXACTLY);
            }
            else {
                itemHeight = (itemHeight === undefined) ? this.getMeasuredHeight() / spanCount : itemHeight;
                if (itemWidth === undefined) {
                    widthSpec = utilsModule.layout.makeMeasureSpec(0, utilsModule.layout.UNSPECIFIED);
                }
                else {
                    widthSpec = utilsModule.layout.makeMeasureSpec(itemWidth, utilsModule.layout.EXACTLY);
                }
                heightSpec = utilsModule.layout.makeMeasureSpec(itemHeight, utilsModule.layout.EXACTLY);
            }
            return viewModule.View.measureChild(this, cellView, widthSpec, heightSpec);
        }
        return undefined;
    };
    RadListView.prototype.prepareCellTag = function (cell) {
        cell.tag = this._nextCellTag + 1;
        this._nextCellTag++;
        this._realizedCells.set(cell.tag, cell);
    };
    RadListView.prototype.prepareLoadOnDemandCell = function (cell, indexPath) {
        if (cell.view === undefined) {
            var loadOnDemandView = this.getLoadOnDemandItemTemplateContent();
            if (loadOnDemandView) {
                cell.view = loadOnDemandView;
                this.disableIosOverflowSafeArea(cell.view);
                this.prepareCellTag(cell);
                cell.view.bindingContext = this.bindingContext;
                this._addView(cell.view);
                cell.contentView.addSubview(cell.view.ios);
            }
        }
        this.layoutLoadOnDemandCell(cell);
    };
    RadListView.prototype.prepareHeaderCell = function (headerCell, indexPath) {
        var viewType = this.groupingFunction ? commonModule.ListViewViewType.GroupView : commonModule.ListViewViewType.HeaderView;
        this.prepareHeaderFooterCell(headerCell, viewType, indexPath);
    };
    RadListView.prototype.prepareFooterCell = function (footerCell, indexPath) {
        this.prepareHeaderFooterCell(footerCell, commonModule.ListViewViewType.FooterView, indexPath);
    };
    RadListView.prototype.prepareHeaderFooterCell = function (cell, viewType, indexPath) {
        if ((cell.view === undefined || cell.view.parent === undefined) || this.isDataOperationsEnabled) {
            if (cell.view !== undefined) {
                cell.view.ios.removeFromSuperview();
                cell.view = undefined;
            }
            cell.view = this.getSupplementaryView(indexPath, this.getViewForViewType(viewType));
            this.disableIosOverflowSafeArea(cell.view);
            this.prepareCellTag(cell);
            if (cell.view) {
                this.updateHeaderFooterBindingContext(cell, indexPath);
                this._addView(cell.view);
                this.layoutHeaderFooterCell(cell);
                cell.contentView.addSubview(cell.view.ios);
            }
        }
        else {
            this.updateHeaderFooterBindingContext(cell, indexPath);
        }
    };
    RadListView.prototype.getSupplementaryView = function (indexPath, originalTemplateView) {
        var suplementaryView;
        if (this.isDataOperationsEnabled && indexPath.section === 0) {
            var templateView = this.getViewForViewType(commonModule.ListViewViewType.HeaderView);
            if (templateView) {
                templateView.row = 0;
                originalTemplateView.row = 1;
                var parentView = new grid_layout_1.GridLayout();
                parentView.addRow(new grid_layout_1.ItemSpec(0, grid_layout_1.GridUnitType.AUTO));
                parentView.addRow(new grid_layout_1.ItemSpec(1, grid_layout_1.GridUnitType.AUTO));
                parentView.addChild(templateView);
                parentView.addChild(originalTemplateView);
                if (this.nativeScriptViewAdded) {
                    this.nativeScriptViewAdded(parentView, originalTemplateView);
                    parentView[commonModule.NG_VIEW] = originalTemplateView[commonModule.NG_VIEW];
                }
                suplementaryView = parentView;
            }
            else {
                suplementaryView = originalTemplateView;
            }
        }
        else {
            suplementaryView = originalTemplateView;
        }
        return suplementaryView;
    };
    RadListView.prototype.updateHeaderFooterBindingContext = function (cell, indexPath) {
        var context = this.getBindingContext(indexPath);
        cell.view.bindingContext = context;
        var args = {
            eventName: commonModule.RadListView.itemLoadingInternalEvent,
            object: this,
            index: -1,
            view: cell.view,
            ios: cell
        };
        this.notify(args);
        if (args.view !== cell.view) {
            // view has been changed on the event handler
            cell.view = args.view;
            this.disableIosOverflowSafeArea(cell.view);
            this.prepareCellTag(cell);
            if (cell.view) {
                cell.view.bindingContext = context;
            }
        }
    };
    RadListView.prototype.getBindingContext = function (indexPath) {
        if (!this.isDataOperationsEnabled || !this.groupingFunction) {
            return this.bindingContext;
        }
        else {
            return this._getDataItemFromSection(0, indexPath.section, true);
        }
    };
    // This is needed by https://github.com/NativeScript/NativeScript/pull/6656
    RadListView.prototype.disableIosOverflowSafeArea = function (parentView) {
        if (parentView) {
            parentView.iosOverflowSafeAreaEnabled = false;
        }
    };
    RadListView.prototype.prepareCell = function (tableCell, indexPath, templateType, raiseItemLoadingEvent) {
        var cell = tableCell;
        if (cell.view === undefined) {
            cell.view = this.getItemTemplateContent(indexPath.item, templateType);
            this.disableIosOverflowSafeArea(cell.view.itemView);
            this.disableIosOverflowSafeArea(cell.view.swipeView);
            this.prepareCellTag(cell);
            if (this.reorderMode && this.reorderMode === commonModule.ListViewReorderMode.Drag) {
                var reorderHandle_1 = undefined;
                cell.view.itemView.eachChildView(function (view) {
                    if (view instanceof ReorderHandle) {
                        reorderHandle_1 = view;
                        return false;
                    }
                    return true;
                });
                if (reorderHandle_1) {
                    // At this point the cell is not yet added to the layout,
                    // so its nativeView is not initialized. We call _setupUI to
                    // force the creation of the nativeView.
                    reorderHandle_1._setupUI({});
                    cell.reorderHandle = reorderHandle_1.ios;
                }
            }
        }
        if (cell.view.itemView && !cell.view.itemView.parent) {
            if (cell.myContentView && cell.myContentView.ios) {
                cell.myContentView.ios.removeFromSuperview();
                cell.myContentView = null;
            }
            this._addView(cell.view.itemView);
            cell.myContentView = cell.view.itemView;
            if (cell.contentView.subviews && cell.contentView.subviews.count > 0) {
                cell.contentView.insertSubviewBelowSubview(cell.view.itemView.ios, cell.contentView.subviews.objectAtIndex(0));
            }
            else {
                cell.contentView.addSubview(cell.view.itemView.ios);
            }
        }
        if (!this.isDataOperationsEnabled) {
            this.prepareItem(cell.view.itemView, indexPath.row);
        }
        else {
            this.prepareItemFromSection(cell.view.itemView, indexPath.row, indexPath.section);
        }
        if (cell.view.itemSwipeView && !cell.view.itemSwipeView.parent) {
            if (cell.myBackgroundView && cell.myBackgroundView.ios) {
                cell.myBackgroundView.ios.removeFromSuperview();
                cell.myBackgroundView = null;
            }
            cell.myBackgroundView = cell.view.itemSwipeView;
            this._addView(cell.view.itemSwipeView);
            cell.swipeBackgroundView.addSubview(cell.view.itemSwipeView.ios);
        }
        if (!this.isDataOperationsEnabled) {
            this.prepareItem(cell.view.itemSwipeView, indexPath.row);
        }
        else {
            this.prepareItemFromSection(cell.view.itemSwipeView, indexPath.row, indexPath.section);
        }
        var internalLoadingArgs = {
            eventName: commonModule.RadListView.itemLoadingInternalEvent,
            object: this,
            index: indexPath.row,
            view: cell.view.itemView,
            ios: cell
        };
        this.notify(internalLoadingArgs);
        if (internalLoadingArgs.view !== cell.view.itemView) {
            // view has been changed on the event handler
            this._removeView(cell.view.itemView);
            cell.view.itemView = internalLoadingArgs.view;
            this.prepareCell(cell, indexPath, templateType, raiseItemLoadingEvent);
            return;
        }
        if (raiseItemLoadingEvent) {
            var args = {
                eventName: commonModule.RadListView.itemLoadingEvent,
                object: this,
                index: indexPath.row,
                view: cell.view.itemView,
                ios: cell
            };
            this.notify(args);
            if (args.view !== cell.view.itemView) {
                // view has been changed on the event handler
                this._removeView(cell.view.itemView);
                cell.view.itemView = args.view;
                this.prepareCell(cell, indexPath, templateType, raiseItemLoadingEvent);
            }
        }
    };
    RadListView.prototype.getFirstVisiblePosition = function () {
        var firstIndex = undefined;
        if (this.nativeView) {
            var cells = this.nativeView.collectionView.visibleCells;
            var visibleIndexes = [];
            for (var i = 0; i < cells.count; i++) {
                var indexPath = this.nativeView.collectionView.indexPathForCell(cells[i]);
                visibleIndexes.push(indexPath.row);
            }
            firstIndex = visibleIndexes.sort()[0];
        }
        return firstIndex;
    };
    return RadListView;
}(commonModule.RadListView));
exports.RadListView = RadListView;
