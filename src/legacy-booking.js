// @ts-nocheck
/* eslint-disable */

"use strict";

import {parse} from 'query-string';
const { sheetUrl } = parse(window.location.search);

moment.locale("de"),angular.module("booking",["ngTouch","booking.calendar"]).constant("sheetUrl",sheetUrl).controller("MainController",["$scope",function(){var e=this;this.selection={},this.validation={},this.selectDay=function(n){if(n.booking){var t=null!=e.selection.start?e.selection.start.date:null,a=n.booking.start.isSame(n.date,"day"),i=n.booking.end.isSame(n.date,"day"),s=n.booking.start.isAfter(t),o=n.booking.end.isBefore(t);if(!(a&&s||i&&o))return void(e.selection.booking=e.selection.booking==n.booking?null:n.booking)}null==e.selection.start||null!=e.selection.end?(e.selection.start=null!=e.selection.end&&e.selection.start.date.isSame(n.date,"day")?null:n,e.selection.end=null):n.date.isSame(e.selection.start.date,"day")?e.selection.start=null:n.date.isBefore(e.selection.start.date)?(e.selection.end=e.selection.start,e.selection.start=n):e.selection.end=n}}]).directive("squarespaceConnector",["$timeout",function(e){return{restricted:"E",scope:{start:"=",end:"=",validation:"="},link:function(n){var t=$("[name=SQF_START]"),a=$("[name=SQF_END]"),i=$(":submit"),s=$(".date-validation");i.click(function(t){var a=null==n.start,i=null==n.end;return a||i?(e(function(){n.validation.invalidStart=a,n.validation.invalidEnd=i}),t.preventDefault(),void s.show()):(s.hide(),void e(function(){n.validation.success=!0}))}),n.$watch("start",function(){t.val(n.start?n.start.format("DD/MM/YYYY"):"")}),n.$watch("end",function(){a.val(n.end?n.end.format("DD/MM/YYYY"):"")})}}}]);var _classCallCheck=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")},_createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}();!function(){angular.module("booking.calendar",[]).factory("Calendar",["$log","$timeout","sheetUrl",function(e,n,t){var a={SUNDAY:0,MONDAY:1,SATURDAY:6},i={Free:1,Arrival:2,Departure:4,Booked:8},s=function(){function e(n,t){_classCallCheck(this,e),this.date=n,this.isOffset=!!t,this.state=i.Free,this.isWeekend=n.day()===a.SATURDAY||n.day()===a.SUNDAY,this.booking=null}return _createClass(e,[{key:"_hasState",value:function(e){return(this.state&e)===e}},{key:"isBooked",value:function(){return this._hasState(i.Booked)}},{key:"isArrival",value:function(){return this._hasState(i.Arrival)}},{key:"isDeparture",value:function(){return this._hasState(i.Departure)}}]),e}(),o=function(){function o(){_classCallCheck(this,o),this.dayMap={},this.months=[],this.days=[];var e=this;Tabletop.init({key:t,callback:function(t){n(function(){return e.setBookings(t)})},simpleSheet:!0})}return _createClass(o,[{key:"_ensureDay",value:function(e){var n=e.format("YYYYMMDD"),t=this.dayMap[n];return t||(this.dayMap[n]=t=new s(e)),t}},{key:"_parseDate",value:function(e){return moment(e,"DD/MM/YYYY")}},{key:"getDay",value:function(e){return this._ensureDay(e)}},{key:"setView",value:function(e,n){this.months=[],this.days=[];do{var t={date:e.clone(),weeks:[]};this.months.push(t);for(var i=null,o=1;31>=o;o++){var r=t.date.clone().date(o);if(1===o){t.weeks.push(i={days:[]});for(var d=r.day()===a.SUNDAY?-6:1;d<r.day();d++)i.days.push(new s(r.clone().day(d),!0))}else i&&r.day()!==a.MONDAY||t.weeks.push(i={days:[]});var l=this._ensureDay(r);if(i.days.push(l),this.days.push(l),r.day()!==a.SUNDAY&&1===r.clone().date(o+1).date()){for(var c=r.day()+1;7>=c;c++)i.days.push(new s(r.clone().day(c),!0));break}}}while(e.add(1,"months").isBefore(n)||e.isSame(n,"month"))}},{key:"setBookings",value:function(n){var t=this,a=this;n.forEach(function(n){if(!n.start||!n.end)return void e.warn("Invalid booking: missing start or end date.",n);try{n.start=t._parseDate(n.start,"DD/MM/YYYY"),n.end=t._parseDate(n.end,"DD/MM/YYYY");var s=n.start.clone(),o=n.end.clone();if(o.isBefore(s))return void e.warn("Invalid booking: end date is before start date.",n);var r=a._ensureDay(s.clone());r.state|=i.Arrival,r.booking=n;var d=a._ensureDay(o.clone());for(d.state|=i.Departure,d.booking=n;!s.add(1,"day").isSame(o);){var l=a._ensureDay(s.clone());l.state|=i.Booked,l.booking=n}}catch(c){e.error("Failed to load booking.",n,c)}})}}]),o}();return new o}]).controller("BookingController",["$timeout","$scope","Calendar",function(e,n,t){n.currentMonth=moment(),n.calendar=t,n.moveView=function(e){n.currentMonth=n.currentMonth.add(e,"month");var t=moment(n.currentMonth).subtract(1,"month"),a=moment(n.currentMonth).add(1,"month");n.calendar.setView(t,a)},n.moveView(0),n.selectDay=function(e){!e.isOffset&&angular.isFunction(n.onSelect)&&n.onSelect({day:e})},n.isInRange=function(e){var t=n.selection.start,a=n.selection.end;return t&&a?e.date.isAfter(t.date,"day")&&e.date.isBefore(a.date,"day"):!1}}]).directive("bookingCalendar",function(){return{restrict:"E",scope:{spreadsheetUrl:"@",selection:"=",onSelect:"&"},controller:"BookingController",templateUrl:"calendar.tpl.html"}})}(),angular.module("booking").run(["$templateCache",function(e){e.put("squarespace-form-dates.tpl.html",'<div ng-if="!start">Bitte wählen Sie in der Kalenderansicht oben das Anreise- und Abreisedatum aus.</div>\n<!--<div ng-if="start">-->\n  <!--{{ start.format("dddd, Do MMMM YYYY") }} <span ng-if="end">- {{ end.format("dddd, Do MMMM YYYY") }}</span>-->\n<!--</div>-->\n\n\n<h1>Anreise</h1>\n<p>{{ start.format("dddd, Do MMMM YYYY") }}</p>\n\n<h1>Abreise</h1>\n<p>{{ end.format("dddd, Do MMMM YYYY") }}</p>'),e.put("calendar.tpl.html",'<div class="calendar">\n\n  <div ng-repeat="month in calendar.months" class="month" ng-class="{\'hide-small\': $first || $last }">\n\n    <div class="month-caption">\n      <div ng-if="!$last" ng-class="{ \'hide-large\': !$first }" class="navigation-back" ng-click="moveView(-1)">&#8592;</div>\n      <div ng-if="!$first" ng-class="{ \'hide-large\': !$last }" class="navigation-next" ng-click="moveView(1)">&#8594;</div>\n      <h3>{{ month.date.format(\'MMMM YY\')  }}</h3>\n    </div>\n    <div class="clear"></div>\n    <div ng-repeat="week in month.weeks" class="week" >\n\n      <div ng-if="$first" class="month-header">\n        <div ng-repeat="day in week.days" ng-class="{ \'weekend-day\': day.isWeekend}">\n          {{ day.date.format(\'dd\') }}\n        </div>\n      </div>\n\n      <div ng-class="{ \'last-week\': $last }" >\n        <div ng-click="selectDay(day)" ng-repeat="day in week.days" class="day" ng-class="{\n              \'weekend-day\': day.isWeekend,\n              \'first-day\': $first,\n              \'last-day\': $last,\n              \'offset-day\': day.isOffset,\n              \'booked-day\': day.isBooked(),\n              \'arrival-day\': day.isArrival(),\n              \'departure-day\': day.isDeparture(),\n              \'selected-day\': day == selection.start || day == selection.end || isInRange(day),\n              \'selected-booking\': selection.booking && day.booking == selection.booking }" >\n          <span>{{ day.date.format(\'DD\') }}</span>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n\n  <div class="clear"></div>\n\n</div>\n\n')}]);
