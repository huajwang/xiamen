import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { INotification } from 'app/shared/model/notification.model';
import { NotificationService } from './notification.service';

@Component({
    selector: 'jhi-notification-update',
    templateUrl: './notification-update.component.html'
})
export class NotificationUpdateComponent implements OnInit {
    notification: INotification;
    isSaving: boolean;
    date: string;
    sentDate: string;

    constructor(private notificationService: NotificationService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ notification }) => {
            this.notification = notification;
            this.date = this.notification.date != null ? this.notification.date.format(DATE_TIME_FORMAT) : null;
            this.sentDate = this.notification.sentDate != null ? this.notification.sentDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.notification.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        this.notification.sentDate = this.sentDate != null ? moment(this.sentDate, DATE_TIME_FORMAT) : null;
        if (this.notification.id !== undefined) {
            this.subscribeToSaveResponse(this.notificationService.update(this.notification));
        } else {
            this.subscribeToSaveResponse(this.notificationService.create(this.notification));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INotification>>) {
        result.subscribe((res: HttpResponse<INotification>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
