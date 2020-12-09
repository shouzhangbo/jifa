/********************************************************************************
 * Copyright (c) 2020 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/
package org.eclipse.jifa.master.service;

import io.vertx.serviceproxy.ServiceException;
import org.eclipse.jifa.common.aux.ErrorCode;
import org.eclipse.jifa.common.util.Assertion;

public class ServiceAssertion extends Assertion {
    public static final ServiceAssertion SERVICE_ASSERT = new ServiceAssertion();

    @Override
    protected void throwEx(ErrorCode errorCode, String message) {
        throw new ServiceException(errorCode.ordinal(), message);
    }
}
