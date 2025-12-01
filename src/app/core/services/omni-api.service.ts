import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';

// ------------------------------------------------
// INTERFACES EXISTANTES
// ------------------------------------------------

export interface SurMesureData {
  fullName: string;
  email: string;
  phoneNumber: string;
  message?: string;
  enterpriseName: string;
  accountNumber: number;
}

export interface ContactData {
  fullName: string;
  email: string;
  phoneNumber: string;
  message?: string;
  enterpriseName: string;
  domainName: string;
  accountNumber: number;
  accountList: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ParticularData {
  firstName: string;
  lastName: string;
  personalEmail: string;
  phoneNumber: string;
  message?: string;
  nameAccount: string;
  fullAccountEmail: string;
}

@Injectable({
  providedIn: 'root',
})
export class OmniApiService {
  private readonly BASE_URL = `${environment.apiBaseUrl}`;

  constructor(private readonly http: HttpClient) {}
  /**
   * Soumettre une demande "Sur Mesure"
   */

  submitSurMesure(data: SurMesureData): Observable<ApiResponse<any>> {
    return this.http.post<any>(`${this.BASE_URL}/surmesures`, data).pipe(
      map((response) => {
        // Si la réponse n'a pas de propriété success, on considère que c'est un succès
        if (response && typeof response.success === 'undefined') {
          return {
            success: true,
            data: response,
            message: response.message || 'Demande envoyée avec succès',
          };
        }

        if (!response.success) {
          throw new Error(response.message || 'Erreur lors de la soumission');
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }
  /**
   * Soumettre un formulaire de contact avec configuration complète (ancien/entreprise)
   */

  submitContact(data: ContactData): Observable<ApiResponse<any>> {
    return this.http.post<any>(`${this.BASE_URL}/contacts`, data).pipe(
      map((response) => {
        // Si la réponse n'a pas de propriété success, on considère que c'est un succès
        if (response && typeof response.success === 'undefined') {
          return {
            success: true,
            data: response,
            message: response.message || 'Demande enregistrée avec succès',
          };
        }

        if (!response.success) {
          throw new Error(response.message || 'Erreur lors de la soumission');
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }
  /**
   * Soumettre un formulaire de contact pour un Particulier (Nouveau)
   */

  submitParticular(data: ParticularData): Observable<ApiResponse<any>> {
    // Utilisation du chemin d'API : /api/particulars
    return this.http.post<any>(`${this.BASE_URL}/particulars`, data).pipe(
      map((response) => {
        if (response && typeof response.success === 'undefined') {
          return {
            success: true,
            data: response,
            message:
              response.message ||
              'Demande de particulier enregistrée avec succès',
          };
        }

        if (!response.success) {
          throw new Error(
            response.message || 'Erreur lors de la soumission du particulier'
          );
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }
  /**
   * Récupérer toutes les demandes "Sur Mesure"
   */

  getSurMesures(): Observable<ApiResponse<SurMesureData[]>> {
    return this.http
      .get<ApiResponse<SurMesureData[]>>(`${this.BASE_URL}/surmesures`)
      .pipe(catchError(this.handleError));
  }
  /**
   * Récupérer tous les contacts
   */

  getContacts(): Observable<ApiResponse<ContactData[]>> {
    return this.http
      .get<ApiResponse<ContactData[]>>(`${this.BASE_URL}/contacts`)
      .pipe(catchError(this.handleError));
  }
  /**
   * Gestion centralisée des erreurs
   */

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur est survenue. Veuillez réessayer.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur de connexion: ${error.error.message}`;
    } else {
      if (error.status === 400) {
        errorMessage =
          error.error?.message ||
          "Le nom de compte demandé n'est pas disponible ou les données sont incorrectes. Veuillez vérifier.";
      } else if (error.status === 404) {
        errorMessage = "Le service de contact n'est pas disponible (404).";
      } else if (error.status >= 500) {
        errorMessage =
          'Erreur serveur. Nous travaillons à résoudre le problème.';
      } else {
        // Autres erreurs (401, 403, etc.)
        errorMessage =
          error.error?.message ||
          `Erreur ${error.status}: Un problème est survenu.`;
      }
    }

    console.error('Erreur API:', errorMessage); // throwError crée un nouvel Observable d'erreur, contenant le message clarifié.
    return throwError(() => new Error(errorMessage));
  }
}
