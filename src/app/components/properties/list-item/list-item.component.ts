import { Component, signal, input, inject, EventEmitter, Output } from '@angular/core';
import { SelectedProperty } from '../../../model/properties.type';
import {
  CirclePlusIcon, LucideAngularModule, CircleIcon,
  CircleCheckIcon, CirclePowerIcon, BedIcon, MapIcon,
  PercentIcon, ShieldUserIcon,
  BookmarkIcon,
  ChartLineIcon,
  EllipsisVerticalIcon,
  Trash2Icon
} from 'lucide-angular';
import { LocalService } from '../../../services/localstorage.service';

@Component({
  selector: 'app-properties-list-item',
  imports: [LucideAngularModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  p = input<any>({});
  selected = input<SelectedProperty>({});
  localStore = inject(LocalService);
  @Output() action = new EventEmitter<string>();

  readonly CirclePlusIcon = CirclePlusIcon;
  readonly CircleIcon = CircleIcon;
  readonly CirclePowerIcon = CirclePowerIcon;
  readonly CircleCheckIcon = CircleCheckIcon;
  readonly BedIcon = BedIcon;
  readonly MapIcon = MapIcon;
  readonly PercentIcon = PercentIcon;
  readonly ShieldUserIcon = ShieldUserIcon;
  readonly BookmarkIcon = BookmarkIcon;
  readonly ChartLineIcon = ChartLineIcon;
  readonly EllipsisVerticalIcon = EllipsisVerticalIcon;
  readonly TrashIcon = Trash2Icon;

  onSetMainProperty(e: MouseEvent, p: any) {

    // TODO: I think I should 'emit' this to the parent?
    this.action.emit(p)
    /*this.localStore.setData('lb.ip', JSON.stringify({
      IdProperty: p.IdProperty,
      Name: p.PropertyName,
      CheckIn: p.PropertyCheckIn,
      CheckOut: p.PropertyCheckOut,
    }));*/
    //this.selected.set(JSON.parse(this.localStore.getData('lb.ip') || '{}'));
  }
}
